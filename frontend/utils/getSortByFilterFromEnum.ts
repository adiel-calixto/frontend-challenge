import { Product, ProductSort } from "@/types/Product";

export default function getSortByFilterFromEnum(sort: ProductSort) {
  var sortField: keyof Product;
  var sortOrder: "ASC"|"DESC" = "ASC";

  switch(sort) {
    case ProductSort.NEWS:
      sortField = "created_at";
    break;
    case ProductSort.MOST_SALES:
      sortField = "sales";
    break;
    case ProductSort.PRICE_ASC:
      sortField = "price_in_cents";
    break;
    case ProductSort.PRICE_DESC:
      sortField = "price_in_cents";
      sortOrder = "DESC";
    break;
    default:
      sortField = "created_at";
    }

  return {
    sortOrder,
    sortField,
  }
}
