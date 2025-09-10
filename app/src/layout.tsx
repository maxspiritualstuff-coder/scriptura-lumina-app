import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from '@/hooks/use-auth';
import { ThemeProvider } from '@/components/scriptura/ThemeProvider';
import { BibleDataProvider } from '@/hooks/use-bible-data';

export const metadata: Metadata = {
  title: 'Scriptura Lumina',
  description: 'Seu dicionário e comentário bíblico com IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <BibleDataProvider>
              {children}
            </BibleDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
