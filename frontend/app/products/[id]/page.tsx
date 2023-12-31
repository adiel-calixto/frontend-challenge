"use client";

import { Container } from "@/components/Container";
import Navigation from "@/components/Navigation";
import { CartContext } from "@/contexts/cart";
import useProduct from "@/hooks/useProduct";
import { ProductCategory } from "@/types/Product";
import { formatPrice } from "@/utils/formatPrice";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { styled } from "styled-components";

export const dynamic = "force-dynamic";

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: start;
  height: 36.25rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 20rem;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 1rem;
  color: ${(props) => props.theme.text_dark};

  @media screen and (max-width: 1024px) {
    align-items: center;
  }
`;

const Title = styled.h1``;

const Price = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.darker_grey};
  margin-bottom: 1.5rem;
`;

const Description = styled.h3`
  color: ${(props) => props.theme.text};
  margin-top: 3rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.blue};
  color: #fff;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  text-transform: uppercase;
  margin-top: auto;
  font-size: 1rem;
  padding: 0.625rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled(ShoppingBagIcon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const renderCategory = (category: ProductCategory) => {
  switch (category) {
    case ProductCategory.MUGS:
      return "Caneca";
    case ProductCategory.T_SHIRTS:
      return "Camiseta";
    default:
      return "";
  }
};

export default function ShowProduct({ params }: { params: { id: string } }) {
  const { data: product, error } = useProduct(params.id);
  const { addProduct } = useContext(CartContext);
  const router = useRouter();

  const handleClick = () => {
    addProduct({ ...product, quantity: 1 });
    router.push("/cart");
  };

  return (
    <Container>
      {product ? (
        <>
          <Navigation />
          <Wrapper>
            <ImageContainer>
              <Image
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={90}
                style={{ objectFit: "cover" }}
                alt={product.name}
                src={product.image_url}
              />
            </ImageContainer>
            <TextWrapper>
              <p style={{ fontSize: "1rem" }}>
                {renderCategory(product.category)}
              </p>
              <Title>{product.name}</Title>
              <Price>{formatPrice(product.price_in_cents / 100)}</Price>
              <p style={{ fontSize: ".75rem" }}>
                *Frete de $40,00 para todo o Brasil. Grátis para compras acima
                de R$900,00.
              </p>

              <Description>DESCRIÇÃO</Description>
              <p>{product.description}</p>

              <Button onClick={handleClick}>
                <ButtonIcon />
                Adicionar ao carrinho
              </Button>
            </TextWrapper>
          </Wrapper>
        </>
      ) : (
        <>Algum erro ocorreu</>
      )}
    </Container>
  );
}
