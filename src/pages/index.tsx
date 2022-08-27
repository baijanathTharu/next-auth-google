import type { NextPage } from 'next';
import Link from 'next/link';
import { AccountHandler } from '../components/account';

const Home: NextPage = () => {
  return (
    <div className='mx-auto w-full min-h-screen max-w-lg my-2 flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-center'>Next Auth</h1>
      <main className='my-4'>
        <AccountHandler />
      </main>
    </div>
  );
};

export default Home;
