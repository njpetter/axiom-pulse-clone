// src/app/layout.tsx
import './styles/globals.css';
import type { ReactNode } from 'react';
import Providers from './components/Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Keep layout a Server Component; Providers is a Client Component */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
