// src/app/page.tsx  (Server Component — no "use client")
import PulseClient from './components/PulseClient';

export default function Page() {
  return (
    <main className="min-h-screen bg-surface text-white p-6">
      <PulseClient />
    </main>
  );
}
