# OPERATIONS.md

Operational reference for nickscherer.com, grounded in `infrastructure/terraform/` and `.github/workflows/`. CI and CD workflows both exist; **no AWS infrastructure has been provisioned yet** — see the bootstrap prerequisites and the pending-actions ledger below.

## Branching & deploy workflow

Long-lived branches: **`dev`** (development) and **`prod`** (production —
pushing it triggers the CD workflow below).

1. **Feature work** branches off `dev` (`feat/<name>`, `fix/<name>`,
   `docs/<name>`, `roadmap/<name>`), is built and tested locally with all
   quality gates green (lint, typecheck, static build), then **squash-merged**
   into `dev` when ready.
2. **Push `dev`** — publishes code for visibility and backup only; nothing
   deploys from `dev`.
3. **Deploy to prod (owner action):** open a PR from `dev` into `prod` and merge
   it with a merge commit — the merge is the push that starts CD (frontend CD →
   S3 + CloudFront).
   ```bash
   gh pr create -B prod -H dev -t "Promote dev → prod" -b "<what ships>"
   gh pr merge <n> --merge --match-head-commit <reviewed-sha>
   ```
   Never squash or rebase a promote PR (that forks `prod` from `dev`).
   `--match-head-commit` refuses the merge if a routine merged more into `dev`
   after you reviewed.
4. Agents open or merge a promote PR only when the owner asks in that session;
   routines never do.

## CD — `frontend-cd-prod.yml`

Trigger: **push to `prod`** (paths: `app/**`, `components/**`, `lib/**`,
`public/**`, `scripts/**`, top-level config files, or the workflow file).
Steps: pnpm 9 + Node 20 → `pnpm install --frozen-lockfile` → `pnpm build`
(NODE_ENV=production) → `aws s3 sync out/` to the bucket in repo secret
`S3_BUCKET_NAME` (immutable long-cache for assets, `max-age=0` for HTML/JSON/TXT/XML/MD,
`--delete`) → CloudFront invalidation `/*` on `CLOUDFRONT_DISTRIBUTION_ID`. AWS
auth via repo secrets `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`, region
us-east-1.

**CD will fail until all four secrets exist** (see bootstrap below).

## Infrastructure (Terraform)

- **Location:** `infrastructure/terraform/` (root config + `modules/frontend-cdn`, `modules/redirect-cdn`)
- **Requirements:** Terraform ≥ 1.5.0, AWS provider `~> 5.0`, region us-east-1
- **State:** S3 backend — bucket `nickscherer-terraform-state`, key `prod/terraform.tfstate`, encrypted, `use_lockfile = true`
- **Environment config:** `envs/prod.tfvars` (`env = "prod"`, `primary_domain = "nickscherer.com"`, `redirect_domain = ""`)

What it provisions:

| Module | Resources |
|---|---|
| `frontend-cdn` | Private versioned S3 bucket `nickscherer-frontend-prod-<account-id>`, CloudFront distribution (OAC, HTTPS, HTTP/2+3, PriceClass_100) for apex + `www`, ACM cert in us-east-1 with automated Route53 DNS validation, CloudFront Functions (viewer-request: URL rewrite + `Accept: text/markdown` negotiation/Markdown 404; viewer-response: `Vary: Accept`, `.md`/`.txt` content-types — code in `modules/frontend-cdn/functions/`, `pnpm test:edge`), 404/403 → `/404.html` (status 404), Route53 A-alias records |
| `redirect-cdn` | **Currently disabled** (`redirect_domain` is empty). When set: S3 website-redirect bucket + CloudFront + ACM + Route53 that 301s a secondary domain to the primary |

Terraform runs from `infrastructure/terraform/` with the prod var file, e.g. `terraform plan -var-file=envs/prod.tfvars`. Applying requires owner AWS credentials — treat any apply as a **⏸ pending prod action**.

Root outputs (`outputs.tf`): `frontend_bucket`, `cloudfront_distribution_id` (documented in-code as "use for cache invalidation"), `cloudfront_domain`.

## Bootstrap prerequisites (one-time, owner-performed)

In order — nothing downstream works until each is done:

1. **Create the state bucket** `nickscherer-terraform-state` in us-east-1 with
   versioning enabled (name is global; verify availability).
2. **Route53 hosted zone for `nickscherer.com` must exist, with the registrar's
   NS records delegating to it.** The `frontend-cdn` module looks the zone up
   with a `data "aws_route53_zone"` block — `terraform plan/apply` hard-fails
   without the zone, and ACM DNS validation hangs without working delegation.
3. `terraform init && terraform apply -var-file=envs/prod.tfvars` from
   `infrastructure/terraform/`.
4. **Create the four repo secrets:** `AWS_ACCESS_KEY_ID`,
   `AWS_SECRET_ACCESS_KEY`, plus `S3_BUCKET_NAME` and
   `CLOUDFRONT_DISTRIBUTION_ID` from the Terraform outputs.
5. Optional: branch protection on `prod`. Don't make the CI check required there: CI runs on pull requests into `dev` only, never on promote PRs ([ADR-0004](docs/adr/0004-pr-only-ci.md)).

## Deploying the site

Handled by the CD workflow above: push `prod` and it builds the static export
and publishes to S3 + CloudFront. The workflow's `S3_BUCKET_NAME` /
`CLOUDFRONT_DISTRIBUTION_ID` secrets must match Terraform's `frontend_bucket` /
`cloudfront_distribution_id` outputs.

## Monitoring / logging

None configured in this repo.

## ⏸ Pending prod actions

> Append-only ledger of production actions awaiting the owner (terraform applies, credential setup, DNS changes). Clear rows when done.

| Date | Action | Status |
|---|---|---|
| 2026-07-18 | Full infra bootstrap for nickscherer.com (steps 1–4 above): state bucket, hosted zone + delegation, first `terraform apply`, four repo secrets. CD cannot succeed until complete. | ✅ Done 2026-07-18 (verified 2026-11-18: distribution live, secrets set, CD run 29661076451 green) |
| 2026-11-18 | ADR-0003 agent-ready edge: **after** the dev → prod promote that ships `index.md`/`llms.txt`/`robots.txt`/`sitemap.xml`, run `cd infrastructure/terraform && AWS_PROFILE=aviai terraform apply -var-file=envs/prod.tfvars` (read-only plan 2026-11-18: 1 add `viewer_response` fn, 2 change `url_rewrite` fn 1.0→2.0 runtime + distribution error responses/association, 0 destroy). Verify with the curl checks in ADR-0003. | ✅ Done (verified 2026-11-21: read-only `terraform plan -var-file=envs/prod.tfvars` on `prod` reports "No changes", so the apply had already been run; curl checks pass — `/llms.txt` 200 text/plain, `Accept: text/markdown` on `/` 200 text/markdown, unknown path 404) |
