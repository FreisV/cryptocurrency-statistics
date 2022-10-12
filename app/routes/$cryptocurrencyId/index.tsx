import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getCryptocurrencyById } from "~/api/cryptocurrencies";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Col,
  GreenSpan,
  Main,
  RedSpan,
  Row,
  Wrapper,
} from "~/components/styles";
import styled from "styled-components";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.cryptocurrencyId, "expected params.cryptocurrencyId");
  const cryptocurrency = getCryptocurrencyById(params.cryptocurrencyId);

  return cryptocurrency;
};

const H2 = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
`;

const Symbol = styled.span`
  font-size: 1em;
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

  const vwap24Hr = reduceMoney(parseFloat(cryptocurrency.vwap24Hr));
  const changePercent24Hr = reduceNumber(
    parseFloat(cryptocurrency.changePercent24Hr)
  );

  return (
    <Wrapper>
      <Main>
        <Row>
          <Col>
            <H2>{cryptocurrency.name}</H2>
            <Symbol>{cryptocurrency.symbol}</Symbol>
          </Col>

          <Row width="22%" height="80px">
            <Col width="46%">
              <span>
                <Grey>HIGH</Grey>
              </span>
              <Grey>LOW</Grey>
            </Col>
            <Col width="46%">
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
          </Row>
        </Row>
      </Main>
    </Wrapper>
  );
};

export default CryptocurrencyInfo;
