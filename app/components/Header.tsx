import { useEffect, useState } from "react";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";
import BriefcaseModal from "./BriefcaseModal";
import {
  Briefcase,
  Cryptocurrencies,
  Span,
  Logo,
  Nav,
  StyledHeader,
  StyledLink,
} from "./styles/headerStyles";
import { GreenSpan, RedSpan, Row } from "./styles/styles";

type HeaderProps = {
  topThree: CryptocurrencyType[];
};

const Header = ({ topThree }: HeaderProps) => {
  const [briefcaseHide, setIsBriefcaseHide] = useState(true);
  const briefcase = useTypedSelector((state) => state.briefcase.briefcase);
  const [briefcasePurchaseCost, setBriefcasePurchaseCost] = useState(0);
  const [briefcaseActualCost, setBriefcaseActualCost] = useState(0);
  const [costDifference, setCostDifference] = useState(0);
  const [percentageDifference, setPercentageDifference] = useState(0);

  useEffect(() => {
    setBriefcasePurchaseCost(
      briefcase.length === 0
        ? 0
        : briefcase.reduce((sum, current) => sum + current.purchasePrice, 0)
    );
    setBriefcaseActualCost(
      briefcase.length === 0
        ? 0
        : briefcase.reduce(
            (sum, current) =>
              sum +
              current.quantity *
                parseFloat(current.cryptocurrency.priceUsd || "0"),
            0
          )
    );
    setCostDifference(
      briefcase.length === 0
        ? 0
        : -1 * (briefcasePurchaseCost - briefcaseActualCost)
    );
    setPercentageDifference(
      briefcase.length === 0
        ? 0
        : reduceNumber((Math.abs(costDifference) / briefcasePurchaseCost) * 100)
    );
  }, [briefcase, briefcaseActualCost, briefcasePurchaseCost, costDifference]);

  return (
    <StyledHeader>
      <BriefcaseModal isHide={briefcaseHide} setIsHide={setIsBriefcaseHide} />
      <Row
        justify="space-between"
        align="center"
        maxWidth="1440px"
        width="100%"
      >
        <Logo>
          <StyledLink to="/" prefetch="render">
            CoinCap
          </StyledLink>
        </Logo>
        <Nav>
          <Row align="center">
            <Cryptocurrencies>
              {topThree &&
                topThree.map((cryptocurrency) => (
                  <Span key={cryptocurrency.id}>
                    <StyledLink to={"/" + cryptocurrency.id} prefetch="intent">
                      {cryptocurrency.symbol}: $
                      {reduceMoney(parseFloat(cryptocurrency.priceUsd || "0"))}
                    </StyledLink>
                  </Span>
                ))}
            </Cryptocurrencies>
            <Span>
              $ {reduceMoney(briefcaseActualCost)}{" "}
              {costDifference > 0 ? (
                <GreenSpan>
                  + ${reduceMoney(costDifference)} ({percentageDifference} %)
                </GreenSpan>
              ) : costDifference < 0 ? (
                <RedSpan>
                  - ${reduceMoney(Math.abs(costDifference))} (
                  {percentageDifference} %)
                </RedSpan>
              ) : (
                <span>
                  + ${reduceMoney(costDifference)} ({percentageDifference} %)
                </span>
              )}
            </Span>
            <Briefcase onClick={() => setIsBriefcaseHide(false)}>
              Briefcase
            </Briefcase>
          </Row>
        </Nav>
      </Row>
    </StyledHeader>
  );
};

export default Header;
