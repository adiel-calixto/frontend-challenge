import StyledComponentsRegistry from "./lib/registry";
import NavBar from "@/components/NavBar";
import ThemeProvider from "./lib/theme-provider";
import { ApolloWrapper } from "./lib/apollo-provider";
import { Saira } from "next/font/google";

import "./globals.css";
import { CartProvider } from "@/contexts/cart";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={saira.className}>
        <StyledComponentsRegistry>
          <ApolloWrapper>
            <ThemeProvider>
              <CartProvider>
                <NavBar />
                {children}
              </CartProvider>
            </ThemeProvider>
          </ApolloWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
