import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Col, GreenSpan, Main, RedSpan, Row } from "~/components/styles";
import styled from "styled-components";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.cryptocurrencyId, "expected params.cryptocurrencyId");
  const cryptocurrency = await getCryptocurrencyById(params.cryptocurrencyId);

  return cryptocurrency;
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
  const cryptocurrency = useLoaderData<CryptocurrencyType>();

  const vwap24Hr = cryptocurrency.vwap24Hr
    ? reduceMoney(parseFloat(cryptocurrency.vwap24Hr))
    : "null";
  const changePercent24Hr = cryptocurrency.changePercent24Hr
    ? reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))
    : "null";

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
              <B>${vwap24Hr}</B>
            </Row>
            <Row>
              <Grey>CHANGE</Grey>
              <B>
                {changePercent24Hr > 0 ? (
                  <GreenSpan>{changePercent24Hr}%</GreenSpan>
                ) : changePercent24Hr < 0 ? (
                  <RedSpan>{changePercent24Hr}%</RedSpan>
                ) : (
                  { changePercent24Hr } + "%"
                )}
              </B>
            </Row>
          </Col>
        </InfoBlock>
      </Info>
    </Main>
  );
};

export default CryptocurrencyInfo;
