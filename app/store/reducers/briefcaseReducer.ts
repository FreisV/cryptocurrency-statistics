import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import type {
  AddCryptocurrencyAction,
  BriefcaseAction,
  BriefcaseState,
  CryptocurrencyInBriefcaseType,
  SubtractCryptocurrencyAction,
  UpdateCryptocurrenciesAction,
} from "~/types/briefcase";
import { BriefcaseActionTypes } from "~/types/briefcase";
import { reduceNumber } from "~/utils/helpers/helpers";

const initialState: BriefcaseState = {
  briefcase: [],
};

const correctAddCryptocurrency = (
  state: BriefcaseState,
  action: AddCryptocurrencyAction
): CryptocurrencyInBriefcaseType[] => {
  if (action.payload.quantity <= 0) {
    return state.briefcase.map((el) => structuredClone(el));
  }

  const cryptocurrencies = state.briefcase.map((el) => structuredClone(el));

  const indexCryptocurrency = cryptocurrencies.findIndex(
    (el) => el.cryptocurrency.id === action.payload.cryptocurrency.id
  );

  if (indexCryptocurrency === -1) {
    return [...cryptocurrencies, action.payload];
  }

  const cryptocurrency = cryptocurrencies[indexCryptocurrency];
  cryptocurrency.purchasePrice += action.payload.purchasePrice;
  cryptocurrency.quantity += action.payload.quantity;

  cryptocurrencies[indexCryptocurrency] = cryptocurrency;

  return cryptocurrencies;
};

const correctSubtractCryptocurrency = (
  state: BriefcaseState,
  action: SubtractCryptocurrencyAction
): CryptocurrencyInBriefcaseType[] => {
  if (action.payload.quantity <= 0) {
    return state.briefcase.map((el) => structuredClone(el));
  }

  const cryptocurrencies = state.briefcase.map((el) => structuredClone(el));

  const indexCryptocurrency = cryptocurrencies.findIndex(
    (el) => el.cryptocurrency.id === action.payload.cryptocurrency.id
  );

  if (indexCryptocurrency === -1) {
    return cryptocurrencies;
  }

  const cryptocurrency = cryptocurrencies[indexCryptocurrency];

  if (cryptocurrency.quantity <= action.payload.quantity) {
    return cryptocurrencies.filter(
      (el) => el.cryptocurrency.id !== cryptocurrency.cryptocurrency.id
    );
  }

  //Shows how many percent of the cryptocurrency is left of the previous amount
  const procent =
    100 - action.payload.quantity / (cryptocurrency.quantity / 100);

  cryptocurrency.purchasePrice = (cryptocurrency.purchasePrice / 100) * procent;
  cryptocurrency.quantity = reduceNumber(
    cryptocurrency.quantity - action.payload.quantity
  );

  cryptocurrencies[indexCryptocurrency] = cryptocurrency;

  return cryptocurrencies;
};

const correctUpdateCryptocurrencies = (
  state: BriefcaseState,
  action: UpdateCryptocurrenciesAction
): CryptocurrencyInBriefcaseType[] => {
  const cryptocurrencies = state.briefcase.map((el) => structuredClone(el));
  //const indexCryptocurrency = cryptocurrencies.findIndex(el => el.cryptocurrency.id === action.payload.);

  //if (indexCryptocurrency === -1) {
  //   return cryptocurrencies;
  // }
  cryptocurrencies.forEach((el) => {
    const newData = action.payload.find(
      (cryptocurrency) => cryptocurrency.id === el.cryptocurrency.id
    );
    if (newData !== undefined) {
      el.cryptocurrency = structuredClone(newData);
    }
  });

  return cryptocurrencies;
};

export const briefcaseReducer = (
  state = initialState,
  action: BriefcaseAction
): BriefcaseState => {
  switch (action.type) {
    case BriefcaseActionTypes.ADD_CRYPTOCURRENCY:
      return { ...state, briefcase: correctAddCryptocurrency(state, action) };
    case BriefcaseActionTypes.SUBTRACT_CRYPTOCURRENCY:
      return {
        ...state,
        briefcase: correctSubtractCryptocurrency(state, action),
      };
    case BriefcaseActionTypes.UPDATE_CRYPTOCURRENCIES:
      return {
        ...state,
        briefcase: correctUpdateCryptocurrencies(state, action),
      };
    default:
      return state;
  }
};

export const addCryptocurrency = (payload: CryptocurrencyInBriefcaseType) => ({
  type: BriefcaseActionTypes.ADD_CRYPTOCURRENCY,
  payload,
});

export const subtractCryptocurrency = (payload: {cryptocurrency: CryptocurrencyType, quantity: number}) => ({
   type: BriefcaseActionTypes.SUBTRACT_CRYPTOCURRENCY,
   payload 
});

export const updateCryptocurrencies = ( payload: CryptocurrencyType[] ) => ({ type: BriefcaseActionTypes.UPDATE_CRYPTOCURRENCIES, payload });
