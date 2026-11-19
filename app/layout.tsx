import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { PERSON_JSON_LD, SITE_DESCRIPTION, SITE_TAGLINE, SITE_TITLE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'Nick Scherer',
    'VP Engineering',
    'Agentic AI',
    'AWS',
    'Music Technology',
    'SpaceHeater',
    'Avi AI',
    'Software Engineer',
    'Army Veteran',
  ],
  authors: [{ name: 'Nick Scherer' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_TAGLINE,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
