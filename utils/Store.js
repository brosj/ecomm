import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: { cartItems: [] }
};

const reducer = (state, action) => {
  const currentCartItems = state.cart.cartItems;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existItem = currentCartItems.find(item => item.slug === newItem.slug);
      // const cartItems = existItems ? currentCartItems : [...currentCartItems, newItem];
      const cartItems = existItem ? currentCartItems.map(item => item.name === existItem.name ? newItem : item) : [...currentCartItems, newItem];
      // return { ...state, cart: { cartItems } };
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}