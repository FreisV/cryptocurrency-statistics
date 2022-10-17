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

const AddCryptocurrencyModal = ({cryptocurrency}: AddCryptocurrencyModalProps) => {
  const name = cryptocurrency.name;
  const price = reduceMoney(parseFloat(cryptocurrency.priceUsd || '0'))
  
  const [sum, setSum] = useState(0);

  return (
    <Modal>
      <ModalContent>
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
