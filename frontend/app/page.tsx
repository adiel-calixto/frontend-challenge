"use client";

import { styled } from "styled-components";
import Container from "@/components/Container";
import Tabs, { HomeTabs } from "@/components/Home/Tabs";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/Home/ProductCard";
import useProducts from "@/hooks/useProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getSortByFilterFromEnum from "@/utils/getSortByFilterFromEnum";
import { useCallback } from "react";
import { ProductCategory, ProductSort } from "@/types/Product";
import Filter from "@/components/SortProducts";
import { buildQueryOptionsFromSearchParams } from "@/utils/buildQueryOptionsFromSearchParams";

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    flex-direction: column;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 2rem;
  margin-bottom: 4rem;

  @media screen and (min-width: ${(props) =>
    props.theme.mobile_size}) and (max-width: ${(props) =>
      props.theme.desktop_size}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    grid-template-columns: 1fr;
  }
`;

const PRODUCTS_PER_PAGE = 12;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (resetPage) params.set("page", "1");
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const tab = searchParams.get("tab") ?? "all";
  const sort = searchParams.get("sort");
  const page = parseInt(searchParams.get("page") ?? "1");

  const options = buildQueryOptionsFromSearchParams(searchParams);
  const { data: products, meta } = useProducts({
    ...options,
    perPage: PRODUCTS_PER_PAGE,
  });
  const pageNumber = Math.round(meta.count / PRODUCTS_PER_PAGE);

  const handlePagination = (newPage: number) => {
    router.push(pathname + "?" + createQueryString("page", newPage.toString()));
  };

  const handleSorting = (sort?: ProductSort) => {
    if (sort) {
      router.push(pathname + "?" + createQueryString("sort", sort));
    }
  };

  const handleTab = (tab: HomeTabs) => {
    if (tab) {
      router.push(pathname + "?" + createQueryString("tab", tab, true));
    }
  };

  return (
    <Container>
      <Box>
        <Tabs onChange={handleTab} activeTab={tab as HomeTabs} />
        <Filter onChange={handleSorting} activeSort={sort as ProductSort} />
      </Box>
      <Pagination
        pageNumber={pageNumber}
        page={page}
        onChange={handlePagination}
      />
      <ProductsContainer>
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </ProductsContainer>
      <Pagination
        pageNumber={pageNumber}
        page={page}
        onChange={handlePagination}
      />
    </Container>
  );
}
