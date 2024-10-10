// src/store/cart/cartStore.ts

import { create } from 'zustand';
import { CartItem } from '@/types/cartType';
import { getItem, setItem } from '@/helpers/localStorage';
import { parseJSON } from '@/utils/common';

const CART_LOCAL_STORAGE_KEY = 'CART_LOCAL_STORAGE_KEY';

interface CartState {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  removeCartItem: (itemId: string, userId: string) => void;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
}

const getCartFromLocalStorage = (userId: string): CartItem[] => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  if (!cartData) return [];
  const cartItem = parseJSON(cartData) as { [key: string]: CartItem[] } | null;
  return cartItem?.[userId] ?? [];
};

const setCartToLocalStorage = (cart: CartItem[], userId: string): void => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItem = cartData
    ? (parseJSON(cartData) as { [key: string]: CartItem[] })
    : {};
  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItem,
    [userId]: cart,
  });
};

const calculateTotal = (cart: CartItem[]) =>
  cart.reduce(
    (acc, item) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { totalCount: 0, totalPrice: 0 }
  );

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId: string) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({ cart: prevCartItems, ...total });
  },

  resetCart: (userId: string) => {
    setCartToLocalStorage([], userId);
    set({ cart: [], totalCount: 0, totalPrice: 0 });
  },

  addCartItem: (item: CartItem, userId: string, count: number) => {
    set(state => {
      const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
      let newCart;
      if (existingItemIndex !== -1) {
        newCart = state.cart.map((cartItem, index) => 
          index === existingItemIndex ? { ...cartItem, count: cartItem.count + count } : cartItem
        );
      } else {
        newCart = [...state.cart, { ...item, count }];
      }
      const total = calculateTotal(newCart);
      setCartToLocalStorage(newCart, userId);
      return { cart: newCart, ...total };
    });
  },

  removeCartItem: (itemId: string, userId: string) => {
    set(state => {
      const newCart = state.cart.filter(item => item.id !== itemId);
      const total = calculateTotal(newCart);
      setCartToLocalStorage(newCart, userId);
      return { cart: newCart, ...total };
    });
  },

  changeCartItemCount: (itemId: string, count: number, userId: string) => {
    set(state => {
      const newCart = state.cart.map(item => 
        item.id === itemId ? { ...item, count } : item
      );
      const total = calculateTotal(newCart);
      setCartToLocalStorage(newCart, userId);
      return { cart: newCart, ...total };
    });
  },
}));

// 선택자 함수들
export const selectCart = (state: CartState) => state.cart;
export const selectTotalCount = (state: CartState) => state.totalCount;
export const selectTotalPrice = (state: CartState) => state.totalPrice;