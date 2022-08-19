import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    );
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + " - eCommX" : "eCommX"}</title>
        <meta name="description" content="Best sneakers marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" />

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
                  {cartItemsCount > 0 && (
                    <span className="ml-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
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
