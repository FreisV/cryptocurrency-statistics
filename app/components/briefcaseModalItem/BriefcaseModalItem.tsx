import { useState } from "react";
import { useDispatch } from "react-redux";
import type { CryptocurrencyType } from "~/types/cryptocurrencies";
import { subtractCryptocurrency } from "~/store/reducers/briefcaseReducer";
import type { CryptocurrencyInBriefcaseType } from "~/types/briefcase";
import { reduceMoney } from "~/utils/helpers/helpers";
import { Item } from "../briefcaseModal/briefcaseModalStyles";
import { ModalForm, NumberInput, StyledCol } from "../styles/modalStyles";
import { B, Button, InfoSpan } from "../styles/styles";

type BriefcaseModalItemProps = {
  item: CryptocurrencyInBriefcaseType;
};

const BriefcaseModalItem = ({ item }: BriefcaseModalItemProps) => {
  const [quantity, setQuantity] = useState(0);
  const purchasePrice = reduceMoney(item.purchasePrice);
  const dispatch = useDispatch();

  const subtractFromBriefcase = (
    cryptocurrency: CryptocurrencyType,
    quantity: number
  ) => {
    dispatch(subtractCryptocurrency({ cryptocurrency, quantity }));
  };

  return (
    <Item key={item.cryptocurrency.id}>
      <InfoSpan>
        <B>Cryptocurrency: </B> {item.cryptocurrency.name}
      </InfoSpan>
      <InfoSpan>
        <B>Quantity: </B> {item.quantity}
      </InfoSpan>
      <InfoSpan>
        <B>Purchase price: </B>$ {purchasePrice}
      </InfoSpan>
      <ModalForm
        onSubmit={() => subtractFromBriefcase(item.cryptocurrency, quantity)}
      >
        <StyledCol>
          <NumberInput
            type="number"
            step="any"
            min={0}
            placeholder="Amount of cryptocurrency"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            required
          />
          <Button type="submit">Remove</Button>
        </StyledCol>
      </ModalForm>
    </Item>
  );
};

export default BriefcaseModalItem;
