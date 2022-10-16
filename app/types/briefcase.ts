import type { CryptocurrencyType } from "~/api/cryptocurrencies";

export type CryptocurrencyInBriefcaseType = {
  cryptocurrency: CryptocurrencyType;
  quantity: number;
  purchasePrice: number;
};

export type BriefcaseState = {
  briefcase: CryptocurrencyInBriefcaseType[];
}

export enum BriefcaseActionTypes {
  ADD_CRYPTOCURRENCY = "ADD_CRYPTOCURRENCY",
  SUBTRACT_CRYPTOCURRENCY = "SUBTRACT_CRYPTOCURRENCY"
}

export type BriefcaseAction = {
  type: string,
  payload: CryptocurrencyInBriefcaseType;
}
