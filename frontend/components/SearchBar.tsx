"use client";

import { styled } from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Container = styled.div`
  height: 2.5rem;
  background-color: ${(props) => props.theme.grey};
  padding: 1rem;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    gap: 1rem;
  }
`;

const TextField = styled.input`
  width: 12rem;
  border: none;
  outline: none;
  color: ${(props) => props.theme.text};
  background: transparent;
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

interface SearchBarProps {
  onSearch: (value: string) => any;
}

export default function SearchBar() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const { push } = useRouter();
  const pathname = usePathname();

  const handleSearch = useCallback(() => {
    if (textFieldValue) {
      push("/?" + `q=${textFieldValue}`);
      return;
    }

    push("/");
  }, [push, textFieldValue]);

  useEffect(() => {
    if (pathname !== "/") return;

    const timeout = setTimeout(() => handleSearch(), 500);

    return () => clearTimeout(timeout);
  }, [textFieldValue, handleSearch, pathname]);

  return (
    <Container>
      <TextField
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTextFieldValue(e.target.value)
        }
        placeholder="Procurando por algo específico?"
      />
      <SearchIcon onClick={handleSearch} />
    </Container>
  );
}
