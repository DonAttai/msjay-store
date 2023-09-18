export function currencyFormatter(number: number) {
  return new Intl.NumberFormat(undefined, {
    currency: "NGN",
    style: "currency",
  }).format(number);
}
