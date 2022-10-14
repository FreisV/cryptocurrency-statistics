export type CryptocurrencyType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
};

export const getCryptocurrencies = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=20');
  const cryptocurrencies: CryptocurrencyType[] = (await response.json()).data;
  return cryptocurrencies;
}

export const getCryptocurrencyById = async (cryptocurrencyId: string) => {
  const response = await fetch(`https://api.coincap.io/v2/assets/${cryptocurrencyId}`);
  const cryptocurrencies: CryptocurrencyType = (await response.json()).data;
  return cryptocurrencies;
}

export const getTopThreeCryptocurrencies = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=3');
  const cryptocurrencies: CryptocurrencyType[] = (await response.json()).data;
  return cryptocurrencies;
}