import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Bulgarian version by default
  redirect('/bg');
}
