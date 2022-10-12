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

const fakeCryptocurrencies: CryptocurrencyType[] = [
  {
    "id": "bitcoin",
    "rank": "1",
    "symbol": "BTC",
    "name": "Bitcoin",
    "supply": "17193925.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "119150835874.4699281625807300",
    "volumeUsd24Hr": "2927959461.1750323310959460",
    "priceUsd": "6929.8217756835584756",
    "changePercent24Hr": "-0.8101417214350335",
    "vwap24Hr": "7175.0663247679233209"
  },
  {
    "id": "ethereum",
    "rank": "2",
    "symbol": "ETH",
    "name": "Ethereum",
    "supply": "101160540.0000000000000000",
    "maxSupply": null,
    "marketCapUsd": "40967739219.6612727047843840",
    "volumeUsd24Hr": "1026669440.6451482672850841",
    "priceUsd": "404.9774667045200896",
    "changePercent24Hr": "-0.0999626159535347",
    "vwap24Hr": "415.3288028454417241"
  },
  {
    "id": "ripple",
    "rank": "3",
    "symbol": "XRP",
    "name": "XRP",
    "supply": "39299874590.0000000000000000",
    "maxSupply": "100000000000.0000000000000000",
    "marketCapUsd": "16517228249.2902868380922380",
    "volumeUsd24Hr": "149328134.5032677889393019",
    "priceUsd": "0.4202870472643482",
    "changePercent24Hr": "-1.9518258685302665",
    "vwap24Hr": "0.4318239230821224"
  },
]

export const getCryptocurrencies = () => {
  return fakeCryptocurrencies;
}

export const getCryptocurrencyById = (cryptocurrencyId: string) => {
  return fakeCryptocurrencies.filter(cryptocurrency => cryptocurrency.id === cryptocurrencyId)[0];
}

export const getTopThreeCryptocurrencies = () => {
  return fakeCryptocurrencies.slice(0,3)
}