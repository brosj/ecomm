import React from "react";
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - eCommX' : 'eCommX'}</title>
        <meta name="description" content="Best sneakers marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col min-h-screen justify-between'>
        <header>
          <nav className="flex h-12 shadow-md px-4 items-center justify-between">
            <Link href="/">
              <a className="text-lg font-bold">eCommX</a>
            </Link>
            <div>
              <Link href="/cart"><a className="p-2">Cart</a></Link>
              <Link href="/login"><a className="p-2">Login</a></Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
