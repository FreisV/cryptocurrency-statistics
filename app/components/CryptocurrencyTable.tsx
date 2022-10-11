import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceNumber, reduceMoney } from "../utils/helpers/helpers";

type CryptocurrencyTableProps = {
  cryptocurrencies: CryptocurrencyType[];
};

const Table = styled.table`
  border-spacing: 0px;
`

const Th = styled.th`
  text-align: start;
  padding: 1em;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
`

const Td = styled.td`
  padding: 1em;
  border-bottom: 1px solid #c4c4c4;
`

const CryptocurrencyTable = ({
  cryptocurrencies,
}: CryptocurrencyTableProps) => {

  
  return (
    <Table>
      <thead>
        <tr>
          <Th>Rank</Th>
          <Th colSpan={2}>Name</Th>
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
          <tr key={cryptocurrency.id}>
            <Td>{cryptocurrency.rank}</Td>
            <Td colSpan={2}>{cryptocurrency.name}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.priceUsd))}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.marketCapUsd))}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.vwap24Hr))}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.supply))}</Td>
            <Td>{reduceMoney(parseFloat(cryptocurrency.volumeUsd24Hr))}</Td>
            <Td>
              {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}%
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptocurrencyTable;
