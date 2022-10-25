import axios from "axios";

export type CryptocurrencyType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string | null;
  maxSupply: string | null;
  marketCapUsd: string | null;
  volumeUsd24Hr: string | null;
  priceUsd: string | null;
  changePercent24Hr: string| null;
  vwap24Hr: string | null;
};

export const getCryptocurrencies = async (page: number) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets?offset=${page * 50 - 50}&limit=50`);
  const cryptocurrencies: CryptocurrencyType[] = response.data.data;
  return cryptocurrencies;
}

export const getCryptocurrencyById = async (cryptocurrencyId: string) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${cryptocurrencyId}`);
  const cryptocurrencies: CryptocurrencyType = response.data.data;
  return cryptocurrencies;
}

export const getTopThreeCryptocurrencies = async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets?limit=3');
  const cryptocurrencies: CryptocurrencyType[] = response.data.data;
  return cryptocurrencies;
}

export type HistoryType = {
  priceUsd: string,
  time: number,
}

export const getHistoryById = async (cryptocurrencyId: string) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${cryptocurrencyId}/history?interval=h1`)
  const history: HistoryType[] = response.data.data;
  return history;
}
