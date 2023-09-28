const FORMAT_CURRENCY = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});

export function currencyFormatter(number: number) {
  return FORMAT_CURRENCY.format(number * 1005);
}
