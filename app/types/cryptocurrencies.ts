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
  changePercent24Hr: string | null;
  vwap24Hr: string | null;
};

export type HistoryType = {
  priceUsd: string;
  time: number;
};
