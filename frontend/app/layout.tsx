import { Saira } from "next/font/google";
import { CartProvider } from "@/contexts/cart";
import StyledComponentsRegistry from "@/lib/registry";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import ThemeProvider from "@/lib/theme-provider";
import { Metadata } from "next";
import Header from "@/components/Header";

import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "capputeeno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={saira.className}>
        <ApolloWrapper>
          <CartProvider>
            <ThemeProvider>
              <StyledComponentsRegistry>
                <Header />
                <main>{children}</main>
              </StyledComponentsRegistry>
            </ThemeProvider>
          </CartProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
