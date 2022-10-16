import type { BriefcaseAction, BriefcaseState, CryptocurrencyInBriefcaseType } from "~/types/briefcase";
import { BriefcaseActionTypes } from "~/types/briefcase";


const initialState: BriefcaseState = {
  briefcase: [],
};

const correctAddCryptocurrency = (state: BriefcaseState, action: BriefcaseAction) :CryptocurrencyInBriefcaseType[] => {
  const cryptocurrencies =  state.briefcase.map(el => structuredClone(el));

  const indexCryptocurrency = cryptocurrencies.findIndex(el => el.cryptocurrency.id === action.payload.cryptocurrency.id)

  if (indexCryptocurrency === -1) {
    return [...cryptocurrencies, action.payload]
  }

  const  cryptocurrency = cryptocurrencies[indexCryptocurrency]
  cryptocurrency.purchasePrice += action.payload.purchasePrice;
  cryptocurrency.quantity += action.payload.quantity

  cryptocurrencies[indexCryptocurrency] = cryptocurrency;

  console.log(cryptocurrencies);
  
  return cryptocurrencies
}

export const briefcaseReducer = (state = initialState, action: BriefcaseAction) : BriefcaseState => {
  switch (action.type) {
    case BriefcaseActionTypes.ADD_CRYPTOCURRENCY: 
      return {...state, briefcase: correctAddCryptocurrency(state,action)}
    default:
      return state;
  }
};

export const addCryptocurrency = (payload: CryptocurrencyInBriefcaseType) => ({type: BriefcaseActionTypes.ADD_CRYPTOCURRENCY, payload})