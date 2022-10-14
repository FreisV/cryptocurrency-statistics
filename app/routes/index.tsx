import CryptocurrencyTable from "~/components/CryptocurrencyTable";
import type { CryptocurrencyType} from "~/api/cryptocurrencies";
import { getTopThreeCryptocurrencies } from "~/api/cryptocurrencies";
import { getCryptocurrencies } from "~/api/cryptocurrencies";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Main, Wrapper } from "~/components/styles";
import Header from "~/components/Header";
import Pagination from "~/components/Pagination";

type LoaderType = {
  cryptocurrencies: CryptocurrencyType[];
  topThree: CryptocurrencyType[];
} 

export const loader: LoaderFunction = async () => {
  const cryptocurrencies = await getCryptocurrencies();
  const topThree = await getTopThreeCryptocurrencies();

  return {cryptocurrencies, topThree};
};

const Index = () => {
  const {cryptocurrencies, topThree} = useLoaderData<LoaderType>();

  return (
    <Wrapper>
      <Header topThree={topThree}/>
      <Main>
        <CryptocurrencyTable cryptocurrencies={cryptocurrencies} />
        <Pagination currentPage={1}/>
      </Main>
    </Wrapper>
  );
};

export default Index;
