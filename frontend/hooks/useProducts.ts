import ListMetadata from "@/types/ListMetadata";
import { Product, ProductFilter } from "@/types/Product";
import { gql, useSuspenseQuery } from "@apollo/client";

interface QueryResponse {
  allProducts: [];
  _allProductsMeta: ListMetadata;
}

interface HookOptions {
  filter?: ProductFilter;
  page?: number;
  perPage?: number;
  sortField?: keyof Product;
  sortOrder?: "ASC" | "DESC";
}

const query = gql`
  query AllProducts(
    $page: Int
    $perPage: Int
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
