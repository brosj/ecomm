import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

const reducer = (state, action) => {
  const currentCartItems = state.cart.cartItems;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existItem = currentCartItems.find(item => item.slug === newItem.slug);
      const cartItems = existItem ? currentCartItems.map(item => item.name === existItem.name ? newItem : item) : [...currentCartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_RESET': {
      Cookies.remove('cart');
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        }
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return { 
        ...state, 
        cart: { 
          ...state.cart, 
          shippingAddress: {
            ...state.cart.shippingAddress, 
            ...action.payload 
          }
        } 
      };
    }

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}