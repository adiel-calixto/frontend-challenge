"use client";

import { styled } from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Form = styled.form`
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

const Button = styled.button`
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: none;
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

export default function SearchBar() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const queryValue = searchParams.get("q") ?? "";
  const [textFieldValue, setTextFieldValue] = useState(queryValue);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = useCallback(() => {
    if (textFieldValue) {
      push("/?" + `q=${textFieldValue}`);
      return;
    }

    if (queryValue) push("/");
  }, [push, textFieldValue, queryValue]);

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        value={textFieldValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTextFieldValue(e.target.value)
        }
        placeholder="Procurando por algo específico?"
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Form>
  );
}
