"use client";

import CartProduct from "@/types/CartProduct";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "cart";

interface CartContextState {
  products: CartProduct[];
  totalPrice: number;
  addProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  updateProduct: (
    id: string,
    properties: Pick<CartProduct, "quantity">
  ) => void;
}

export const CartContext = createContext<CartContextState>({
  products: [],
  totalPrice: 0,
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});

export function CartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const totalPrice =
    products.reduce((acc, cur) => acc + cur.price_in_cents * cur.quantity, 0) /
    100;

  useEffect(() => {
    if (!hasLoaded) {
      const session = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");

      if (Array.isArray(session)) {
        setProducts(session);
      }

      setHasLoaded(true);
    }
  }, [hasLoaded]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: CartProduct) => {
    if (products.findIndex((p) => p.id == product.id) !== -1) return;
    setProducts([...products, product]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateProduct = (
    id: string,
    properties: Pick<CartProduct, "quantity">
  ) => {
    setProducts(
      products.map((product) =>
        product.id == id ? { ...product, ...properties } : product
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        removeProduct,
        updateProduct,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
