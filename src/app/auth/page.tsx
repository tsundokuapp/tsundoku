import { redirect } from 'next/navigation';

export default function AuthLegacyRoute() {
  redirect('/login');
}
