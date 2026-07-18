import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Nick Scherer — VP Engineering & Agentic AI Builder',
  description:
    'Professional resume of Nick Scherer — VP of Engineering at Rostrum Pacific / SpaceHeater. Agentic AI, music tech, AWS, full-stack product development, and Army veteran.',
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
  openGraph: {
    title: 'Nick Scherer — VP Engineering & Agentic AI Builder',
    description:
      'Building at the intersection of Agentic AI, Big Data, and Music Technology.',
    type: 'website',
    url: 'https://nickscherer.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nick Scherer — VP Engineering & Agentic AI Builder',
    description:
      'Building at the intersection of Agentic AI, Big Data, and Music Technology.',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
