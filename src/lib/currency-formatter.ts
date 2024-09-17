import { EXCHANGE_RATE } from "./utils";

const FORMAT_CURRENCY = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});
export function currencyFormatter(number: number) {
  return FORMAT_CURRENCY.format(number * EXCHANGE_RATE);
}
