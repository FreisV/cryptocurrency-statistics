import axios from "axios";
import type { CryptocurrencyType, HistoryType } from "~/types/cryptocurrencies";

export const getCryptocurrencies = async (page: number) => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets?offset=${page * 50 - 50}&limit=50`
  );
  const cryptocurrencies: CryptocurrencyType[] = response.data.data;
  return cryptocurrencies;
};

export const getCryptocurrencyById = async (cryptocurrencyId: string) => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets/${cryptocurrencyId}`
  );
  const cryptocurrencies: CryptocurrencyType = response.data.data;
  return cryptocurrencies;
};

export const getTopThreeCryptocurrencies = async () => {
  const response = await axios.get("https://api.coincap.io/v2/assets?limit=3");
  const cryptocurrencies: CryptocurrencyType[] = response.data.data;
  return cryptocurrencies;
};

export const getHistoryById = async (cryptocurrencyId: string) => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets/${cryptocurrencyId}/history?interval=h1`
  );
  const history: HistoryType[] = response.data.data;
  return history;
};
