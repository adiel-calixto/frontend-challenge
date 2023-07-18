"use client";

import { Product } from "@/types/Product";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  max-width: 16rem;
  gap: 0.25rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 18.75rem;
`;

const Text = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.625rem;
`;

const Title = styled.h3`
  font-weight: 300;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dce2e5;
  display: block;
  margin: 0.5rem 0;
`;

const Price = styled.h4`
  font-weight: bold;
  color: ${(props) => props.theme.darker_grey};
`;

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/products/${product.id}`)}>
      <ImageContainer>
        <Image
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            borderTopRightRadius: ".5rem",
            borderTopLeftRadius: ".5rem",
          }}
          src={product.image_url}
        />
      </ImageContainer>
      <Text>
        <Title>{product.name}</Title>
        <Divider />
        <Price>{formatPrice(product.price_in_cents / 100)}</Price>
      </Text>
    </Container>
  );
}
