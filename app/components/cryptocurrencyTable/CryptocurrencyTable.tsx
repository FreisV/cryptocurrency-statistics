import type { CryptocurrencyType } from "~/types/cryptocurrencies";
import { reduceNumber, reduceMoney } from "../../utils/helpers/helpers";
import { useState } from "react";
import AddCryptocurrencyModal from "../addCryptocurrencyModal/AddCryptocurrencyModal";
import { Add, StyledLink, Table, Td, Th, Tr } from "./styles";
import Percentages from "../percentages/Percentages";

type CryptocurrencyTableProps = {
  cryptocurrencies: CryptocurrencyType[];
};

const CryptocurrencyTable = ({
  cryptocurrencies,
}: CryptocurrencyTableProps) => {
  const [currentCryptocurrency, setCurrentCryptocurrency] = useState(
    cryptocurrencies[0]
  );
  const [isHide, setIsHide] = useState(true);

  return (
    <Table>
      <AddCryptocurrencyModal
        cryptocurrency={currentCryptocurrency}
        isHide={isHide}
        setIsHide={setIsHide}
      />
      <thead>
        <tr>
          <Th align="left">#</Th>
          <Th align="left">Name</Th>
          <Th>Price</Th>
          <Th>Market Cap</Th>
          <Th>VWAP(24Hr)</Th>
          <Th>Supply</Th>
          <Th>Volume(24Hr)</Th>
          <Th>Change(24Hr)</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {cryptocurrencies.map((cryptocurrency) => {
          const changePercent24Hr = cryptocurrency.changePercent24Hr
            ? reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))
            : null;

          return (
            <Tr key={cryptocurrency.id}>
              <Td align="left">
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.rank}
                </StyledLink>
              </Td>
              <Td align="left">
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.name}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.priceUsd
                    ? "$ " + reduceMoney(parseFloat(cryptocurrency.priceUsd))
                    : "none"}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.marketCapUsd
                    ? "$ " +
                      reduceMoney(parseFloat(cryptocurrency.marketCapUsd))
                    : "none"}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.vwap24Hr
                    ? "$ " + reduceMoney(parseFloat(cryptocurrency.vwap24Hr))
                    : "none"}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.supply &&
                  parseFloat(cryptocurrency.supply) * 10 ** 10 > 0
                    ? reduceMoney(parseFloat(cryptocurrency.supply))
                    : "none"}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  {cryptocurrency.volumeUsd24Hr
                    ? "$ " +
                      reduceMoney(parseFloat(cryptocurrency.volumeUsd24Hr))
                    : "none"}
                </StyledLink>
              </Td>
              <Td>
                <StyledLink to={cryptocurrency.id} prefetch="intent">
                  <Percentages percentages={changePercent24Hr} />
                </StyledLink>
              </Td>
              <Td
                align="center"
                onClick={() => {
                  setCurrentCryptocurrency(cryptocurrency);
                  setIsHide(false);
                }}
              >
                <Add>+</Add>
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CryptocurrencyTable;
