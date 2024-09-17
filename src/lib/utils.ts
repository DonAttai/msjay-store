import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export const EXCHANGE_RATE: number = 1500;

export function formatNumber(
  number: number,
  locale = "en-US",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal", // Use 'decimal' style instead of 'currency'
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(number * EXCHANGE_RATE);
}

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory (FCT)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
