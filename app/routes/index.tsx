import CryptocurrencyTable from "~/components/CryptocurrencyTable";
import type { CryptocurrencyType} from "~/api/cryptocurrencies";
import { getCryptocurrencies } from "~/api/cryptocurrencies";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction =async () => {
  return getCryptocurrencies();
}

const Index = () => {
  const cryptocurrencies = useLoaderData<Array<CryptocurrencyType>>();

  return (
    <div>
      <CryptocurrencyTable cryptocurrencies={cryptocurrencies}/>
    </div>
  );
};

export default Index;
