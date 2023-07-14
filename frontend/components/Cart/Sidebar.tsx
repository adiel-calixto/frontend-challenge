"use client";

import NextLink from "next/link";
import { styled } from "styled-components";
import Divider from "../Divider";
import { formatPrice } from "@/utils/formatPrice";

const SHIPPING_FEE = 40 * 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 43.75rem;
  background-color: #fff;
  padding: 2rem;
  color: ${(props) => props.theme.text_dark};
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
`;

const TextContainer = styled.div<{ $darker?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-content: center;
  font-weight: ${(props) => (props.$darker ? "bold" : "regular")};
`;

const Text = styled.p`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.green};
  text-transform: uppercase;
  font-size: 1rem;
  color: #fff;
  border-radius: 0.25rem;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 2rem 0;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 0.5rem;
`;

const Link = styled(NextLink)`
  text-decoration: underline;
  color: ${(props) => props.theme.text};
`;

export default function CartSidebar({ total }: { total: number }) {
  const totalInCents = total * 100;

  return (
    <Container>
      <Heading>RESUMO DO PEDIDO</Heading>
      <TextContainer>
        <Text>Subtotal de produtos</Text>
        <Text>{formatPrice(totalInCents)}</Text>
      </TextContainer>

      <TextContainer>
        <Text>Entrega</Text>
        <Text>{formatPrice(SHIPPING_FEE)}</Text>
      </TextContainer>

      <Divider />

      <TextContainer $darker>
        <Text>Total</Text>
        <Text>{formatPrice(totalInCents + SHIPPING_FEE)}</Text>
      </TextContainer>

      <Button>Finalizar a compra</Button>

      <LinkContainer>
        <Link href="#">Ajuda</Link>
        <Link href="#">Reembolsos</Link>
        <Link href="#">Entregas e frete</Link>
        <Link href="#">Trocas e devoluções</Link>
      </LinkContainer>
    </Container>
  );
}
