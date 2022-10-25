import type { CryptocurrencyType } from "~/types/cryptocurrencies";

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
  SUBTRACT_CRYPTOCURRENCY = "SUBTRACT_CRYPTOCURRENCY",
  UPDATE_CRYPTOCURRENCIES = "UPDATE_CRYPTOCURRENCIES"
}

export type AddCryptocurrencyAction = {
  type: BriefcaseActionTypes.ADD_CRYPTOCURRENCY;
  payload: CryptocurrencyInBriefcaseType;
}

export type SubtractCryptocurrencyAction = {
  type: BriefcaseActionTypes.SUBTRACT_CRYPTOCURRENCY;
  payload: {cryptocurrency: CryptocurrencyType, quantity: number}
}

export type UpdateCryptocurrenciesAction = {
  type: BriefcaseActionTypes.UPDATE_CRYPTOCURRENCIES;
  payload: CryptocurrencyType[];
}

export type BriefcaseAction = AddCryptocurrencyAction | SubtractCryptocurrencyAction | UpdateCryptocurrenciesAction
