import NavBar from "@/components/NavBar";
import { Saira } from "next/font/google";
import { CartProvider } from "@/contexts/cart";
import StyledComponentsRegistry from "@/lib/registry";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import ThemeProvider from "@/lib/theme-provider";

import "./globals.css";

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
        <ApolloWrapper>
          <ThemeProvider>
            <StyledComponentsRegistry>
              <CartProvider>
                <NavBar />
                {children}
              </CartProvider>
            </StyledComponentsRegistry>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
