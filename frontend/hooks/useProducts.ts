import ListMetadata from "@/types/ListMetadata";
import { Product, ProductFilter } from "@/types/Product";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface QueryResponse {
  allProducts: [];
  _allProductsMeta: ListMetadata;
}

interface HookOptions {
  filter?: ProductFilter;
  page?: number;
  perPage?: number;
  sortField?: keyof Product | null;
  sortOrder?: "ASC" | "DESC";
}

const query = gql`
  query AllProducts(
    $perPage: Int
    $page: Int
    $sortField: String
    $sortOrder: String
    $filter: ProductFilter
  ) {
    allProducts(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      id
      name
      description
      image_url
      category
      price_in_cents
      sales
    }
    _allProductsMeta(filter: $filter) {
      count
    }
  }
`;

export default function useProducts(options: HookOptions) {
  const { data, error } = useSuspenseQuery<QueryResponse>(query, {
    variables: options,
  });

  return {
    data: data.allProducts,
    meta: data._allProductsMeta,
    error,
  };
}
