export const formatPrice = (price_in_cents: number) => {
  return "R$" + (price_in_cents / 100).toFixed(2);
};
