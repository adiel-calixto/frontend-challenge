"use client";

import { styled } from "styled-components";
import BaseContainer from "./Container";
import SearchBar from "./SearchBar";
import ShoppingCartLink from "./ShoppingCartLink";
import { Saira_Stencil_One } from "next/font/google";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

const saira = Saira_Stencil_One({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const BackgroundWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bg};
`;

const Container = styled(BaseContainer)`
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    flex-direction: column;
    height: auto;
    justify-content: center;
  }
`;

const Logo = styled(Link)`
  margin-right: auto;
  font-size: 2.5rem;
  color: #5d5d6d;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    margin-right: 0;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export default function NavBar() {
  const { products } = useContext(CartContext);

  return (
    <BackgroundWrapper>
      <Container>
        <Logo href={"/"} className={saira.className}>
          capputeeno
        </Logo>
        <RightContainer>
          <SearchBar />
          <ShoppingCartLink itemCount={products.length} />
        </RightContainer>
      </Container>
    </BackgroundWrapper>
  );
}
