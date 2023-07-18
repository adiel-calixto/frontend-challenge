"use client";

import { ReactNode } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

const theme = {
  bg: "#FFFFFF",
  text: "#737380",
  text_dark: "#41414D",
  orange: "#FFA584",
  blue: "#105786",
  green: "#51B853",
  red: "#DE3838",
  grey: "#F3F5F6",
  dark_grey: "#E9E9F0",
  darker_grey: "#09090A",
  desktop_size: "1280px",
  mobile_size: "640px",
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
