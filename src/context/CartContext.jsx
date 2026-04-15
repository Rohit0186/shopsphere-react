import React, { createContext, useReducer, useEffect } from 'react';

// Action types defined as constants for better maintainability and to avoid typos
export const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Initial state loads directly from localStorage to ensure persistence after refresh
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

// Reducer handles all cart-related state transitions in one place
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      // Check if product already exists to avoid duplicate entries
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        // If product already exists, increase its quantity instead of adding a duplicate
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      
      // If it's a new product, add it to the cart with an initial quantity of 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    case ACTIONS.CLEAR_CART:
      return {
        cart: [],
      };

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Sync cart state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Helper functions to dispatch actions cleanly from components
  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
