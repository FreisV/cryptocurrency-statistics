import CryptocurrencyTable from "~/components/CryptocurrencyTable";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getCryptocurrencies } from "~/api/cryptocurrencies";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Main, Wrapper } from "~/components/styles";
import Header from "~/components/Header";

export const loader: LoaderFunction = async () => {
  return getCryptocurrencies();
};

const Index = () => {
  const cryptocurrencies = useLoaderData<Array<CryptocurrencyType>>();

  return (
    <Wrapper>
      <Header/>
      <Main>
        <CryptocurrencyTable cryptocurrencies={cryptocurrencies} />
      </Main>
    </Wrapper>
  );
};

export default Index;
