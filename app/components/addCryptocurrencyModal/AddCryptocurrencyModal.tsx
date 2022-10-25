import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { CryptocurrencyType } from "~/types/cryptocurrencies";
import { addCryptocurrency } from "~/store/reducers/briefcaseReducer";
import { reduceMoney } from "~/utils/helpers/helpers";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalForm,
  ModalHeader,
  NumberInput,
  StyledCol,
} from "../styles/modalStyles";
import { B, Button, Col, InfoSpan } from "../styles/styles";

type AddCryptocurrencyModalProps = {
  cryptocurrency: CryptocurrencyType;
  isHide: boolean;
  setIsHide: (a: boolean) => void;
};

const AddCryptocurrencyModal = ({
  cryptocurrency,
  isHide,
  setIsHide,
}: AddCryptocurrencyModalProps) => {
  const [quantity, setQuantity] = useState(0);
  const [sum, setSum] = useState(0);
  const name = cryptocurrency.name;
  const price =
    cryptocurrency.priceUsd === null
      ? 0
      : reduceMoney(parseFloat(cryptocurrency.priceUsd));
  const dispatch = useDispatch();

  useEffect(() => {
    setSum(quantity * parseFloat(cryptocurrency.priceUsd || "0"));
  }, [cryptocurrency, quantity]);

  useEffect(() => {
    setQuantity(0);
  }, [cryptocurrency, isHide]);

  const addInBriefcase = (
    cryptocurrency: CryptocurrencyType,
    quantity: number
  ) => {
    const purchasePrice = quantity * parseFloat(cryptocurrency.priceUsd || "0");
    dispatch(addCryptocurrency({ cryptocurrency, quantity, purchasePrice }));
  };

  if (isHide) {
    return null;
  }

  return (
    <Modal onClick={() => setIsHide(!isHide)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          <Col>
            <InfoSpan>
              <B>Cryptocurrency: </B> {name}
            </InfoSpan>
            <InfoSpan>
              <B>Price: </B>$ {price}
            </InfoSpan>
            <ModalForm
              onSubmit={() => {
                addInBriefcase(cryptocurrency, quantity);
                setIsHide(true);
              }}
            >
              <StyledCol>
                <NumberInput
                  type="number"
                  step="any"
                  min={0}
                  placeholder="Amount of cryptocurrency"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
                <InfoSpan>
                  <B>Sum: </B>$ {sum === 0 ? 0 : reduceMoney(sum)}
                </InfoSpan>
                <Button type="submit">Add</Button>
              </StyledCol>
            </ModalForm>
          </Col>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCryptocurrencyModal;
