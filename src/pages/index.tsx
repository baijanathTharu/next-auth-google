import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='mx-auto w-full min-h-screen max-w-lg my-2 flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-center'>Next Auth</h1>
      <main className='my-4'>
        <Link href={'/api/auth/signin/google'}>
          <button className='btn'>Login with Google</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
