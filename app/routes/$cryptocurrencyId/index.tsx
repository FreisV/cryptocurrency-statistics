import type { CryptocurrencyType, HistoryType } from "~/api/cryptocurrencies";
import { getHistoryById } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  B,
  Col,
  GreenSpan,
  Main,
  RedSpan,
  Row,
} from "~/components/styles/styles";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";
import Chart from "~/components/Chart";
import AddCryptocurrencyModal from "~/components/AddCryptocurrencyModal";
import { useEffect, useState } from "react";
import type { CryptocurrencyInBriefcaseType } from "~/types/briefcase";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { updateCryptocurrencies } from "~/store/reducers/briefcaseReducer";
import { AdaptiveRow, Btn, Grey, H2, Symbol, Info, InfoBlock } from "~/components/styles/cryptocurrencyIdStyles";

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

  const vwap24Hr = cryptocurrency.vwap24Hr
    ? "$ " + reduceMoney(parseFloat(cryptocurrency.vwap24Hr))
    : "none";
  const changePercent24Hr = cryptocurrency.changePercent24Hr
    ? reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))
    : "none";

  const allPrices = history.map((el) => parseFloat(el.priceUsd));
  const high = allPrices.length === 0 ? 0 : reduceMoney(Math.max(...allPrices));
  const low = allPrices.length === 0 ? 0 : reduceMoney(Math.min(...allPrices));
    
  const chartLabels = history.map((el) => {
    const date = new Date(el.time);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const hours = date.getHours();
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${day} ${month} ${hours}:00`;
  });

  return (
    <Main>
      <AddCryptocurrencyModal
        cryptocurrency={cryptocurrency}
        isHide={modalIsHide}
        setIsHide={setModalIsHide}
      />
      <Info wrap="wrap">
        <AdaptiveRow>
          <Col justify="start">
            <H2>{cryptocurrency.name}</H2>
            <Symbol>{cryptocurrency.symbol}</Symbol>
          </Col>

          <InfoBlock>
            <Col width="46%" minWidth="140px">
              <Row>
                <Grey>HIGH</Grey>
                <B>$ {high}</B>
              </Row>
              <Row>
                <Grey>LOW</Grey>
                <B>$ {low}</B>
              </Row>
            </Col>
            <Col width="46%" minWidth="160px">
              <Row>
                <Grey>AVERAGE </Grey>
                <B>{vwap24Hr}</B>
              </Row>
              <Row>
                <Grey>CHANGE</Grey>
                <B>
                  {typeof changePercent24Hr !== "number" ? (
                    "none"
                  ) : changePercent24Hr > 0 ? (
                    <GreenSpan>{changePercent24Hr} %</GreenSpan>
                  ) : changePercent24Hr < 0 ? (
                    <RedSpan>{changePercent24Hr} %</RedSpan>
                  ) : (
                    { changePercent24Hr } + "%"
                  )}
                </B>
              </Row>
            </Col>
          </InfoBlock>
        </AdaptiveRow>
        <Btn onClick={() => setModalIsHide(false)}>Add into briefcase</Btn>
      </Info>
      <Chart
        name={cryptocurrency.name}
        labels={chartLabels}
        values={history.map((el) => parseFloat(el.priceUsd))}
      />
    </Main>
  );
};

export default CryptocurrencyInfo;
