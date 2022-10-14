import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceMoney } from "~/utils/helpers/helpers";
import { Row, StyledHeader } from "./styles";
import { Link } from "@remix-run/react";


type HeaderProps = {
  topThree: CryptocurrencyType[];
}

const Logo = styled.h1`
  margin: 10px 30px;
  padding: 2px;
  border: 2px solid black;
  border-radius: 4px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  color: #3b3b3b;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Profile = styled.span`
  padding: 10px 30px;
  font-size: 1.2em;
  font-weight: 500;
  align-self: right;
`;

const Cryptocurrencies = styled(Row)`

  @media (max-width: 600px) {
    display: none;
  }
`

const Cryptocurrency = styled.span`
  padding: 15px;
  font-size: 0.95em;
`;




const Header = ({topThree}: HeaderProps) => {
  return (
    <StyledHeader>
      <Row justify="space-between" align="center" maxWidth="1440px" width="100%">
        <Logo><StyledLink to="/" prefetch="render">CoinCap</StyledLink></Logo>
        <Nav>
          <Cryptocurrencies>
            {topThree && topThree.map((cryptocurrency) => (
              <Cryptocurrency key={cryptocurrency.id}>
                <StyledLink to={'/'+cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.symbol}: ${reduceMoney(parseFloat(cryptocurrency.priceUsd))}
                </StyledLink>
              </Cryptocurrency>
            ))}
          </Cryptocurrencies>
          <Profile>Портфель</Profile>
        </Nav>
      </Row>
    </StyledHeader>
  );
};

export default Header;
