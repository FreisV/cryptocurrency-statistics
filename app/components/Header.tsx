import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { getTopThreeCryptocurrencies } from "~/api/cryptocurrencies";
import { reduceMoney } from "~/utils/helpers/helpers";
import { Row, StyledHeader } from "./styles";

export const loader: LoaderFunction = () => {
  return getTopThreeCryptocurrencies();
};

const Logo = styled.h1`
  padding: 10px;
`;

const Profile = styled.span`
  padding: 10px;
  font-size: 1.2em;
  font-weight: 500;
`;

const Cryptocurrency = styled.span`
  padding: 15px;
  font-size: 0.95em;
`;

const Header = () => {
  const topThree = useLoaderData<Array<CryptocurrencyType>>();

  return (
    <StyledHeader>
      <Row justify="space-between" align="center" maxWidth="1440px" width="100%">
        <Logo>CoinCap</Logo>
        <Row justify="space-between" align="center" width="60%">
          <Row>
            {topThree.map((cryptocurrency) => (
              <Cryptocurrency key={cryptocurrency.id}>
                {cryptocurrency.symbol}: ${reduceMoney(parseFloat(cryptocurrency.priceUsd))}
              </Cryptocurrency>
            ))}
          </Row>
          <Profile>Портфель</Profile>
        </Row>
      </Row>
    </StyledHeader>
  );
};

export default Header;
