import { useState } from "react";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceMoney } from "~/utils/helpers/helpers";
import BriefcaseModal from "./BriefcaseModal";
import { Briefcase, Cryptocurrencies, Cryptocurrency, Logo, Nav, Row, StyledHeader, StyledLink } from "./styles";


type HeaderProps = {
  topThree: CryptocurrencyType[];
}

const Header = ({topThree}: HeaderProps) => {
  const [briefcaseHide, setIsBriefcaseHide] = useState(true);
  
  return (
    <StyledHeader>
      <BriefcaseModal isHide={briefcaseHide} setIsHide={setIsBriefcaseHide}/>
      <Row justify="space-between" align="center" maxWidth="1440px" width="100%">
        <Logo><StyledLink to="/" prefetch="render">CoinCap</StyledLink></Logo>
        <Nav>
          <Cryptocurrencies>
            {topThree && topThree.map((cryptocurrency) => (
              <Cryptocurrency key={cryptocurrency.id}>
                <StyledLink to={'/'+cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.symbol}: ${reduceMoney(parseFloat(cryptocurrency.priceUsd || '0'))}
                </StyledLink>
              </Cryptocurrency>
            ))}
          </Cryptocurrencies>
          <Briefcase onClick={() => setIsBriefcaseHide(false)}>Briefcase</Briefcase>
        </Nav>
      </Row>
    </StyledHeader>
  );
};

export default Header;
