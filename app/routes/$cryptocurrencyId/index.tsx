import type { CryptocurrencyType, HistoryType } from "~/types/cryptocurrencies";
import { getHistoryById } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Main } from "~/components/styles/styles";
import Chart from "~/components/chart/Chart";
import AddCryptocurrencyModal from "~/components/addCryptocurrencyModal/AddCryptocurrencyModal";
import { useEffect, useState } from "react";
import type { CryptocurrencyInBriefcaseType } from "~/types/briefcase";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { updateCryptocurrencies } from "~/store/reducers/briefcaseReducer";
import InfoCard from "~/components/infoCard/InfoCard";

type LoaderType = {
  cryptocurrency: CryptocurrencyType;
  history: HistoryType[];
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.cryptocurrencyId, "expected params.cryptocurrencyId");
  const cryptocurrency = await getCryptocurrencyById(params.cryptocurrencyId);
  const history = await getHistoryById(params.cryptocurrencyId);

  return { cryptocurrency, history };
};

const CryptocurrencyInfo = () => {
  const { cryptocurrency, history } = useLoaderData<LoaderType>();
  const [modalIsHide, setModalIsHide] = useState(true);

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

  if (!cryptocurrency) {
    return null;
  }

  return (
    <Main>
      <AddCryptocurrencyModal
        cryptocurrency={cryptocurrency}
        isHide={modalIsHide}
        setIsHide={setModalIsHide}
      />
      <InfoCard
        cryptocurrency={cryptocurrency}
        history={history}
        setModalIsHide={setModalIsHide}
      />
      <Chart name={cryptocurrency.name} history={history} />
    </Main>
  );
};

export default CryptocurrencyInfo;
