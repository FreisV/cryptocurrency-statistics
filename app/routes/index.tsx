import CryptocurrencyTable from "~/components/cryptocurrencyTable/CryptocurrencyTable";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import { getTopThreeCryptocurrencies } from "~/api/cryptocurrencies";
import { getCryptocurrencies } from "~/api/cryptocurrencies";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AutoOverflow, Main, Wrapper } from "~/components/styles/styles";
import Header from "~/components/header/Header";
import Pagination from "~/components/pagination/Pagination";
import type { CryptocurrencyInBriefcaseType } from "~/types/briefcase";
import { useEffect } from "react";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { updateCryptocurrencies } from "~/store/reducers/briefcaseReducer";

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
  const briefcase = useTypedSelector((state) => state.briefcase.briefcase);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpdatedData = async (
      briefcase: CryptocurrencyInBriefcaseType[]
    ) => {
      const updatedData = await Promise.all(
        briefcase.map((el) => getCryptocurrencyById(el.cryptocurrency.id))
      );
      return updatedData;
    };
    const updatedData = getUpdatedData(briefcase);
    updatedData.then((briefcase) =>
      dispatch(updateCryptocurrencies(briefcase))
    );
  }, []);

  return (
    <Wrapper>
      <Header topThree={topThree} />
      <Main>
        <Pagination currentPage={page} />
        <AutoOverflow>
          <CryptocurrencyTable cryptocurrencies={cryptocurrencies} />
        </AutoOverflow>
        <Pagination currentPage={page} />
      </Main>
    </Wrapper>
  );
};

export default Index;
