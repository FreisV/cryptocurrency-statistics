import { Link } from "@remix-run/react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { reduceNumber, reduceMoney } from "../utils/helpers/helpers";
import { GreenSpan, RedSpan } from "./styles";
import { addCryptocurrency } from "~/store/reducers/briefcaseReducer";

type CryptocurrencyTableProps = {
  cryptocurrencies: CryptocurrencyType[];
};

const Table = styled.table`
  width: 95%;
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
  padding: 1em 1.5em;

  &:nth-child(2) {
    width: 20%;
  }
`;

const Td = styled.td`
  /*Adapt the text-align*/
  text-align: ${(props) => (props.align ? props.align : "end")};

  border-bottom: 1px solid #c4c4c4;
  font-size: 0.9em;
`;

const Tr = styled.tr`
  &:hover {
    background-color: rgb(248, 250, 253);
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 1.5em;
  color: black;
  text-decoration: none;
`;

const Add = styled.span`
  font-size: 1.5em;
  font-weight: 300;
  transition: font-size 100ms;

  &:hover {
    font-size: 2em;
    cursor: pointer;
  }
`

const CryptocurrencyTable = ({
  cryptocurrencies,
}: CryptocurrencyTableProps) => {
  const briefcase = useTypedSelector(state => state.briefcase)
  const dispatch = useDispatch();

  const addInBriefcase = (cryptocurrency:CryptocurrencyType, quantity:number = 1) => {
    const purchasePrice = quantity * parseFloat(cryptocurrency.priceUsd || '0');
    dispatch(addCryptocurrency({cryptocurrency, quantity, purchasePrice}));
  }

  return (
    <Table>
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
        {cryptocurrencies.map((cryptocurrency) => (
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
              {cryptocurrency.priceUsd ? 
                '$ ' + reduceMoney(parseFloat(cryptocurrency.priceUsd)) :
                'none'}
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={cryptocurrency.id} prefetch="intent">
                {cryptocurrency.marketCapUsd ? 
                '$ ' + reduceMoney(parseFloat(cryptocurrency.marketCapUsd)) :
                'none'}
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={cryptocurrency.id} prefetch="intent">
              {cryptocurrency.vwap24Hr ? 
                '$ ' + reduceMoney(parseFloat(cryptocurrency.vwap24Hr)) :
                'none'}
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={cryptocurrency.id} prefetch="intent">
                {cryptocurrency.supply && (parseFloat(cryptocurrency.supply) * 10**10) > 0  ? 
                reduceMoney(parseFloat(cryptocurrency.supply)) :
                'none'}
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={cryptocurrency.id} prefetch="intent">
              {cryptocurrency.volumeUsd24Hr ? 
                '$ ' + reduceMoney(parseFloat(cryptocurrency.volumeUsd24Hr)) :
                'none'}
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={cryptocurrency.id} prefetch="intent">
              {!cryptocurrency.changePercent24Hr ? 
                'none' :
                reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) >
                0 ? (
                  <GreenSpan>
                    {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}
                    %
                  </GreenSpan>
                ) : reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) <
                  0 ? (
                  <RedSpan>
                    {reduceNumber(parseFloat(cryptocurrency.changePercent24Hr))}
                    %
                  </RedSpan>
                ) : (
                  reduceNumber(parseFloat(cryptocurrency.changePercent24Hr)) +
                  "%"
                )}
              </StyledLink>
            </Td>
            <Td align="center" onClick={() => addInBriefcase(cryptocurrency)}><Add>+</Add></Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptocurrencyTable;
