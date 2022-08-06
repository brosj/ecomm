/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { Store } from "../utils/Store";

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      return alert("Sorry. Product is out of stock");
    }
    
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
