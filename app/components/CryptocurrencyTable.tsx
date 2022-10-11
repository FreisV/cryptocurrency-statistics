import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceNumber, reduceMoney } from "../utils/helpers/helpers";

type CryptocurrencyTableProps = {
  cryptocurrencies: CryptocurrencyType[];
};

const Table = styled.table`
  border-spacing: 0px;
`;

const Th = styled.th`
  /*Adapt the text-align*/
  text-align: ${(props) => (props.align ? props.align : "end")};

  padding: 1em;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 500;
  font-size: 1em;

  &:nth-child(2) {
    width: 20%;
  }
`;

const Td = styled.td`
  /*Adapt the text-align*/
  text-align: ${(props) => (props.align ? props.align : "end")};

  padding: 1em;
  border-bottom: 1px solid #c4c4c4;
  font-size: 0.9em;
`;

const Tr = styled.tr`
  &:hover {
    background-color: rgb(248, 250, 253);
    cursor: pointer;
  }
`;

const RedSpan = styled.span`
  color: #f44336;
`;

const GreenSpan = styled.span`
  color: #18c683;
`;

const CryptocurrencyTable = ({
  cryptocurrencies,
}: CryptocurrencyTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>#</Th>
          <Th align="left">Name</Th>
          <Th>Price</Th>
          <Th>Market Cap</Th>
          <Th>VWAP(24Hr)</Th>
          <Th>Supply</Th>
          <Th>Volume(24Hr)</Th>
          <Th>Change(24Hr)</Th>
        </tr>
      </thead>
      <tbody>
        {cryptocurrencies.map((cryptocurrency) => (
          <Tr key={cryptocurrency.id}>
            <Td>{cryptocurrency.rank}</Td>
            <Td align="left">{cryptocurrency.name}</Td>
            <Td>$ {reduceMoney(parseFloat(cryptocurrency.priceUsd))}</Td>
            <Td>$ {reduceMoney(parseFloat(cryptocurrency.marketCapUsd))}</Td>
            <Td>$ {reduceMoney(parseFloat(cryptocurrency.vwap24Hr))}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.supply))}</Td>
            <Td>$ {reduceMoney(parseFloat(cryptocurrency.volumeUsd24Hr))}</Td>
            <Td>
              {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) >
              0 ? (
                <GreenSpan>
                  {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}%
                </GreenSpan>
              ) : reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) <
                0 ? (
                <RedSpan>
                  {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}%
                </RedSpan>
              ) : (
                reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) + "%"
              )}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptocurrencyTable;
