import type { CryptocurrencyType, HistoryType } from "~/api/cryptocurrencies";
import { getHistoryById } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Col, GreenSpan, Main, RedSpan, Row } from "~/components/styles";
import styled from "styled-components";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";
import Chart from "~/components/Chart";

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

const Info = styled(Row)`
  width: 100%;
  border-color: white;
  padding: 2em;

  -webkit-box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const H2 = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
`;

const Symbol = styled.span`
  padding: 5px 0 40px 0;
  font-size: 1em;
`;

const InfoBlock = styled(Row)`
  width: 60%;
  max-width: 350px;
  height: 80px;
`;

const Grey = styled.span`
  font-weight: 500;
  color: grey;
  text-transform: uppercase;
`;

const B = styled.b`
  font-weight: 500;
`;

const CryptocurrencyInfo = () => {
  const { cryptocurrency, history } = useLoaderData<LoaderType>();

  const vwap24Hr = cryptocurrency.vwap24Hr
    ? "$" + reduceMoney(parseFloat(cryptocurrency.vwap24Hr))
    : "none";
  const changePercent24Hr = cryptocurrency.changePercent24Hr
    ? reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))
    : "none";

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
      <Info wrap="wrap">
        <Col justify="start">
          <H2>{cryptocurrency.name}</H2>
          <Symbol>{cryptocurrency.symbol}</Symbol>
        </Col>

        <InfoBlock>
          <Col width="46%" minWidth="150px">
            <Grey>HIGH</Grey>
            <Grey>LOW</Grey>
          </Col>
          <Col width="46%" minWidth="150px">
            <Row>
              <Grey>AVERAGE </Grey>
              <B>{vwap24Hr}</B>
            </Row>
            <Row>
              <Grey>CHANGE</Grey>
              <B>
                {typeof(changePercent24Hr) !== "number" ? (
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
