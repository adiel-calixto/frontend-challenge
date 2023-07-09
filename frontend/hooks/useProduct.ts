import { Product } from "@/types/Product";
import { gql, useSuspenseQuery } from "@apollo/client";

const query = gql`
  query GetProduct($id: ID!) {
    Product(id: $id) {
      id
      name
      description
      image_url
      category
      price_in_cents
      sales
    }
  }
`;

export default function useProduct(id: string) {
  const {
    data: { Product },
    error,
  } = useSuspenseQuery<{ Product: Product }>(query, {
    variables: { id },
  });

  return {
    data: Product,
    error,
  };
}
