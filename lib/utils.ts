import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmmount = (amount: number): string => {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toLocaleString()}M`;
  } else if (amount >= 1_000) {
    return `₦${(amount / 1_000).toLocaleString()}k`;
  } else {
    return `₦${amount.toLocaleString()}`;
  }
};
