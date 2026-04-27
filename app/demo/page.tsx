import type { Metadata } from 'next';
import { DemoClient } from './demo-client';

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 font-bold text-3xl">Code Block Editor</h1>
      <DemoClient />
    </main>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Demo — Not Indexed',
};
