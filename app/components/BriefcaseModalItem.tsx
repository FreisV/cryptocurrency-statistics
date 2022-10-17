import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { subtractCryptocurrency } from "~/store/reducers/briefcaseReducer";
import type { CryptocurrencyInBriefcaseType } from "~/types/briefcase"
import { reduceMoney } from "~/utils/helpers/helpers"
import { B, Button, Col, InfoSpan, ModalForm, NumberInput, StyledCol } from "./styles";


type BriefcaseModalItemProps = {
  item: CryptocurrencyInBriefcaseType
}

const BriefcaseItem = styled(Col)`
  width: 100%;
  padding: 10px 0;

  &:not(:first-child) {
    border-top: 1px solid #c4c4c4;
  }
`;

const BriefcaseModalItem = ({item} : BriefcaseModalItemProps) => {
  const [quantity, setQuantity] = useState(0);
  const purchasePrice = reduceMoney(item.purchasePrice)
  const dispatch = useDispatch();

  const subtractFromBriefcase = (cryptocurrency:CryptocurrencyType, quantity:number) => {
    const purchasePrice = quantity * parseFloat(cryptocurrency.priceUsd || '0');
    dispatch(subtractCryptocurrency({cryptocurrency, quantity, purchasePrice}));
  }

  return (
    <BriefcaseItem key={item.cryptocurrency.id}>
      <InfoSpan>
        <B>Cryptocurrency: </B> {item.cryptocurrency.name}
      </InfoSpan>
      <InfoSpan>
        <B>Quantity: </B> {item.quantity}
      </InfoSpan>
      <InfoSpan>
        <B>Purchase price: </B>$ {purchasePrice}
      </InfoSpan>
      <ModalForm onSubmit={() => subtractFromBriefcase(item.cryptocurrency, quantity)} >
        <StyledCol>
          <NumberInput
            type="number"
            step="any"
            placeholder="Amount of cryptocurrency"
            onChange={e => setQuantity(parseFloat(e.target.value))}
          />
          <Button>Remove</Button>
        </StyledCol>
      </ModalForm>
    </BriefcaseItem>
)}

export default BriefcaseModalItem