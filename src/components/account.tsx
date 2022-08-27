import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function AccountHandler() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className='btn btn-error' onClick={() => signOut()}>
        Logout
      </button>
    );
  }

  return (
    <Link href={'/api/auth/signin/google'}>
      <button className='btn'>Login with Google</button>
    </Link>
  );
}
