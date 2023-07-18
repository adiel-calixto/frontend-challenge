"use client";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { styled } from "styled-components";

const NavigationWrapper = styled.div`
  padding: 1rem 0;
`;

const NavigationLink = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NavigationIcon = styled(ArrowUturnLeftIcon)`
  width: 1.125rem;
  height: 1.125rem;
  border: solid 1px ${(props) => props.theme.text};
  border-radius: 50%;
  padding: 0.125rem;
`;

export default function Navigation() {
  return (
    <NavigationWrapper>
      <Link href="/">
        <NavigationLink>
          <NavigationIcon />
          Voltar
        </NavigationLink>
      </Link>
    </NavigationWrapper>
  );
}
