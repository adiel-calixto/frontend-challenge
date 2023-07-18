"use client";

import CartProductCard from "@/components/Cart/ProductCard";
import CartSidebar from "@/components/Cart/Sidebar";
import { Container as BaseContainer } from "@/components/Container";
import Navigation from "@/components/Navigation";
import { CartContext } from "@/contexts/cart";
import { formatPrice } from "@/utils/formatPrice";
import { useContext } from "react";
import { styled } from "styled-components";

const Container = styled(BaseContainer)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media screen and (max-width: ${(props) => props.theme.desktop_size}) {
    grid-template-columns: 1fr;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  color: ${(props) => props.theme.text_dark};
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

export default function Cart() {
  const { products, totalPrice, shippingFee } = useContext(CartContext);

  return (
    <Container>
      <div>
        <Navigation />
        <TextContainer>
          <h2>SEU CARRINHO</h2>
          <p>
            Total ({products.length} produtos) <b>{formatPrice(totalPrice)}</b>
          </p>
        </TextContainer>
        <ProductsContainer>
          {products.map((product, i) => (
            <CartProductCard key={i} product={product} />
          ))}
        </ProductsContainer>
      </div>

      <CartSidebar shippingFee={shippingFee} total={totalPrice} />
    </Container>
  );
}
