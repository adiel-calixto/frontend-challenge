"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { styled } from "styled-components";

const CartLink = styled(Link)`
  position: relative;
`;

const CartIcon = styled(ShoppingBagIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const ItemCount = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.red};
  width: 1rem;
  height: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
  font-size: 0.625rem;
`;

interface ShoppingCartLinkProps {
  itemCount: number;
}

export default function ShoppingCartLink({ itemCount }: ShoppingCartLinkProps) {
  return (
    <CartLink href="/cart">
      <CartIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartLink>
  );
}
