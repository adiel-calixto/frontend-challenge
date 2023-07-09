"use client";

import { CartContext } from "@/contexts/cart";
import CartProduct from "@/types/CartProduct";
import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 13rem;
  background: #fff;
  display: flex;
  gap: 1rem;
  border-radius: 0.5rem;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    flex-direction: column;
    height: auto;
  }
`;

const Img = styled.img`
  width: 16rem;
  height: 100%;
  object-fit: cover;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  color: ${(props) => props.theme.text_dark};
`;

const Spaced = styled.div<{ $align?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => props.$align ?? "center"};
`;

const Title = styled.h3``;

const RemoveButton = styled(TrashIcon)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props) => props.theme.red};
  cursor: pointer;
`;

const Description = styled.div`
  margin-top: 1rem;
  height: 4rem;
  overflow: hidden;
`;

const Select = styled.select`
  background: ${(props) => props.theme.grey};
  outline: none;
  border: solid 2px ${(props) => props.theme.dark_grey};
  border-radius: 0.25rem;
  padding: 0.625rem 1rem;
  color: ${(props) => props.theme.darker_grey};
`;

const Option = styled.option``;

const Price = styled.p`
  color: ${(props) => props.theme.darker_grey};
  font-weight: bold;
`;

export default function CartProductCard({ product }: { product: CartProduct }) {
  const { updateProduct, removeProduct } = useContext(CartContext);

  const handleQuantityUpdate = (quantity: number) => {
    updateProduct(product.id, { quantity });
  };

  return (
    <Container>
      <Img src={product.image_url} />
      <ContentWrapper>
        <div>
          <Spaced>
            <Title>{product.name}</Title>
            <RemoveButton onClick={() => removeProduct(product.id)} />
          </Spaced>
          <Description>
            <h5>{product.description}</h5>
          </Description>
        </div>
        <Spaced $align="end">
          <Select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleQuantityUpdate(parseInt(e.target.value))
            }
          >
            <Option value={product.quantity}>{product.quantity}</Option>
            {[1, 2, 5, 10].map(
              (q, i) =>
                q != product.quantity && (
                  <Option key={i} value={q}>
                    {q}
                  </Option>
                )
            )}
          </Select>
          <Price>R${product.price_in_cents / 100}</Price>
        </Spaced>
      </ContentWrapper>
    </Container>
  );
}
