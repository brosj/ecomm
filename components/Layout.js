import React from "react";
import Head from 'next/head';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - eCommX' : 'eCommX'}</title>
        <meta name="description" content="Best sneakers marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex'>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
