import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getTopThreeCryptocurrencies } from "~/api/cryptocurrencies";
import Header from "~/components/header/Header";
import { Wrapper } from "~/components/styles/styles";

export const loader: LoaderFunction = () => {
  return getTopThreeCryptocurrencies();
};

const Cryptocurrency = () => {
  const topThree = useLoaderData<CryptocurrencyType[]>();
  return (
    <Wrapper>
      <Header topThree={topThree} />
      <Outlet />
    </Wrapper>
  );
};

export default Cryptocurrency;
