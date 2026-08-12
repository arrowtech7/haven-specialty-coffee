import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Haven Specialty Coffee',
};

export default function RootPage() {
  redirect('/en');
}
