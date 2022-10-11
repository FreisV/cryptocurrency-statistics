import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceNumber, reduceMoney } from "../utils/helpers/helpers";

type CryptocurrencyTableProps = {
  cryptocurrencies: CryptocurrencyType[];
};

// 

const CryptocurrencyTable = ({
  cryptocurrencies,
}: CryptocurrencyTableProps) => {

  
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th colSpan={2}>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>VWAP(24Hr)</th>
          <th>Supply</th>
          <th>Volume(24Hr)</th>
          <th>Change(24Hr)</th>
        </tr>
      </thead>
      <tbody>
        {cryptocurrencies.map((cryptocurrency) => (
          <tr key={cryptocurrency.id}>
            <td>{cryptocurrency.rank}</td>
            <td colSpan={2}>{cryptocurrency.name}</td>
            <td>{reduceMoney(parseFloat(cryptocurrency.priceUsd))}</td>
            <td>{reduceMoney(parseFloat(cryptocurrency.marketCapUsd))}</td>
            <td>{reduceMoney(parseFloat(cryptocurrency.vwap24Hr))}</td>
            <td>{reduceMoney(parseFloat(cryptocurrency.supply))}</td>
            <td>{reduceMoney(parseFloat(cryptocurrency.volumeUsd24Hr))}</td>
            <td>
              {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptocurrencyTable;
