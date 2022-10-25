import type { CryptocurrencyType, HistoryType } from "~/types/cryptocurrencies";
import { reduceMoney, reduceNumber } from "~/utils/helpers/helpers";
import {
  AdaptiveRow,
  Btn,
  Grey,
  H2,
  Info,
  InfoBlock,
  InfoRow,
  Symbol,
} from "./styles";
import { B, Col } from "../styles/styles";
import Percentages from "../percentages/Percentages";

type InfoCardProps = {
  cryptocurrency: CryptocurrencyType;
  history: HistoryType[];
  setModalIsHide: (arg0: boolean) => void;
};

const InfoCard = ({
  cryptocurrency,
  history,
  setModalIsHide,
}: InfoCardProps) => {
  const vwap24Hr = cryptocurrency.vwap24Hr
    ? "$ " + reduceMoney(parseFloat(cryptocurrency.vwap24Hr))
    : "none";
  const changePercent24Hr = cryptocurrency.changePercent24Hr
    ? reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))
    : null;

  const allPrices = history.map((el) => parseFloat(el.priceUsd));
  const high = allPrices.length === 0 ? 0 : reduceMoney(Math.max(...allPrices));
  const low = allPrices.length === 0 ? 0 : reduceMoney(Math.min(...allPrices));

  return (
    <Info wrap="wrap">
      <AdaptiveRow>
        <Col justify="start">
          <H2>{cryptocurrency.name}</H2>
          <Symbol>{cryptocurrency.symbol}</Symbol>
        </Col>

        <InfoBlock>
          <Col width="46%" minWidth="120px">
            <InfoRow>
              <Grey>HIGH</Grey>
              <B>$ {high}</B>
            </InfoRow>
            <InfoRow>
              <Grey>LOW</Grey>
              <B>$ {low}</B>
            </InfoRow>
          </Col>
          <Col width="46%" minWidth="150px">
            <InfoRow>
              <Grey>AVERAGE </Grey>
              <B>{vwap24Hr}</B>
            </InfoRow>
            <InfoRow>
              <Grey>CHANGE</Grey>
              <B>
                <Percentages percentages={changePercent24Hr} />
              </B>
            </InfoRow>
          </Col>
        </InfoBlock>
      </AdaptiveRow>
      <Btn onClick={() => setModalIsHide(false)}>Add into briefcase</Btn>
    </Info>
  );
};

export default InfoCard;
