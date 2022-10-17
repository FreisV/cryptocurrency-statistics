import { useState } from "react";
import styled from "styled-components";
import type { CryptocurrencyType } from "~/api/cryptocurrencies";
import { reduceMoney } from "~/utils/helpers/helpers";
import {
  B,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalContent,
  ModalForm,
  ModalHeader,
  NumberInput,
} from "./styles";

type AddCryptocurrencyModalProps = {
  cryptocurrency: CryptocurrencyType;
  hide: boolean;
}

const InfoSpan = styled.span`
  margin: 10px;
`

const StyledCol = styled(Col)`
  margin: 10px 0 10px 0;

  & > * {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const AddCryptocurrencyModal = ({cryptocurrency, hide = true}: AddCryptocurrencyModalProps) => {
  const [isHide, setIsHide] = useState(hide)
  const [sum, setSum] = useState(0);
  const name = cryptocurrency.name;
  const price = cryptocurrency.priceUsd === null ? 0 : reduceMoney(parseFloat(cryptocurrency.priceUsd || '0'))
  

  if(isHide){
    return null;
  }


  return (
    <Modal onClick={() => setIsHide(!isHide)}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          <Col>
            <InfoSpan><B>Cryptocurrency: </B> {name}</InfoSpan>
            <InfoSpan><B>Price: </B>$ {price}</InfoSpan>
            <ModalForm>
              <StyledCol width="100%">
                <NumberInput
                  type="number"
                  step="any"
                  placeholder="Amount of cryptocurrency"
                  onChange={e => setSum(Number(e.target.value) *  parseFloat(cryptocurrency.priceUsd || '0'))}
                />
                <InfoSpan><B>Sum: </B>$ {sum === 0 ? 0 : reduceMoney(sum)}</InfoSpan>
                <Button>Add</Button>
              </StyledCol>
            </ModalForm>
          </Col>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCryptocurrencyModal;
