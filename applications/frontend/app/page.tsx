'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/nav/Navigation';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import WorkHistory from '@/components/work/WorkHistory';
import SkillsSection from '@/components/skills/SkillsSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import EducationSection from '@/components/education/EducationSection';
import PublicationsSection from '@/components/publications/PublicationsSection';
import ContactSection from '@/components/contact/ContactSection';
import MediaSection from '@/components/media/MediaSection';
import WritingSection from '@/components/writing/WritingSection';
import CursorSpotlight from '@/components/ui/CursorSpotlight';

export default function Home() {
  return (
    <main className="relative">
      <div className="noise-overlay" aria-hidden="true" />
      <CursorSpotlight />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorkHistory />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <PublicationsSection />
      <WritingSection />
      <MediaSection />
      <ContactSection />
    </main>
  );
}
