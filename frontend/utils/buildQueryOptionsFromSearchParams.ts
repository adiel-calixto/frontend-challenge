import { Product, ProductCategory, ProductSort } from "@/types/Product";
import { ReadonlyURLSearchParams } from "next/navigation";

function getSortFilterFromEnum(sort: string | null) {
  var sortField: keyof Product;
  var sortOrder: "ASC" | "DESC" = "ASC";

  switch (sort) {
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
  };
}

const getCategoryFromTab = (tab: string | null) => {
  if (
    tab == "all" ||
    !tab ||
    !Object.values(ProductCategory).includes(tab as ProductCategory)
  )
    return undefined;

  return tab;
};

export function buildQueryOptionsFromSearchParams(
  searchParams: ReadonlyURLSearchParams
) {
  var page = parseInt(searchParams.get("page") ?? "1");
  page = page > 0 ? page - 1 : page;

  const sort = searchParams.get("sort");
  const tab = searchParams.get("tab");
  const q = searchParams.get("q") ?? undefined;
  const { sortField, sortOrder } = getSortFilterFromEnum(sort);
  const category = getCategoryFromTab(tab);

  return {
    page,
    tab,
    sortField,
    sortOrder,
    filter: {
      q,
      category,
    },
  };
}
