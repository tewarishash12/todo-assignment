// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/todos');
  return null; // This is required even though it's not reached
}
