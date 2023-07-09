"use client";

import { styled } from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(props) => props.theme.desktop_size};
  margin: 0 auto;
  color: ${(props) => props.theme.text};
  padding: 1rem 2rem;
`;

export default Container;
