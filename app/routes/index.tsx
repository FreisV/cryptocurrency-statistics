import CryptocurrencyTable from "~/components/CryptocurrencyTable";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
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
  page: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");

  const cryptocurrencies = await getCryptocurrencies(page);
  const topThree = await getTopThreeCryptocurrencies();

  return { cryptocurrencies, topThree, page };
};

const Index = () => {
  const { cryptocurrencies, topThree, page } = useLoaderData<LoaderType>();

  return (
    <Wrapper>
      <Header topThree={topThree} />
      <Main>
        <Pagination currentPage={page} />
        <CryptocurrencyTable cryptocurrencies={cryptocurrencies} />
        <Pagination currentPage={page} />
      </Main>
    </Wrapper>
  );
};

export default Index;
