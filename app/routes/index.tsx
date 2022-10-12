import CryptocurrencyTable from "~/components/CryptocurrencyTable";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getCryptocurrencies } from "~/api/cryptocurrencies";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Main, Wrapper } from "~/components/styles";

export const loader: LoaderFunction = async () => {
  return getCryptocurrencies();
};

const Index = () => {
  const cryptocurrencies = useLoaderData<Array<CryptocurrencyType>>();

  return (
    <Wrapper>
      <Main>
        <CryptocurrencyTable cryptocurrencies={cryptocurrencies} />
      </Main>
    </Wrapper>
  );
};

export default Index;
