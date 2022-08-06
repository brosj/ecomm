import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utils/Store";

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Head>
        <title>{title ? title + " - eCommX" : "eCommX"}</title>
        <meta name="description" content="Best sneakers marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex h-12 shadow-md px-4 items-center justify-between">
            <Link href="/">
              <a className="text-lg font-bold">eCommX</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 shadow-inner justify-center items-center">
          <p>Copyright &copy; 2022 eCommX</p>
        </footer>
      </div>
    </>
  );
}
