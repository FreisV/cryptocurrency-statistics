import styled from "styled-components";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { reduceMoney } from "~/utils/helpers/helpers";
import {
  B,
  Button,
  Col,
  InfoSpan,
  Modal,
  ModalBody,
  ModalContent,
  ModalForm,
  ModalHeader,
  NumberInput,
  StyledCol
} from "./styles";

type BriefcaseModalProps = {
  isHide: boolean;
  setIsHide: (a: boolean) => void;
};

const BriefcaseInfo = styled(Col)`
  padding: 5px 0 10px 0;
  align-items: center;
  justify-content: center;
`;

const BriefcaseItem = styled(Col)`
  width: 100%;
  padding: 10px 0;

  &:not(:first-child) {
    border-top: 1px solid #c4c4c4;
  }
`;

const BriefcaseModal = ({ isHide, setIsHide }: BriefcaseModalProps) => {
  const briefcase = useTypedSelector((state) => state.briefcase.briefcase);

  if (isHide) {
    return null;
  }

  return (
    <Modal onClick={() => setIsHide(!isHide)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Briefcase</ModalHeader>
        <ModalBody>
          <BriefcaseInfo>
            {briefcase.length === 0
              ? "Портфель пуст"
              : briefcase.map((el) => {
                  const purchasePrice = reduceMoney(el.purchasePrice)

                  return (
                    <BriefcaseItem key={el.cryptocurrency.id}>
                      <InfoSpan>
                        <B>Cryptocurrency: </B> {el.cryptocurrency.name}
                      </InfoSpan>
                      <InfoSpan>
                        <B>Quantity: </B> {el.quantity}
                      </InfoSpan>
                      <InfoSpan>
                        <B>Purchase price: </B>$ {purchasePrice}
                      </InfoSpan>
                      <ModalForm>
                        <StyledCol>
                          <NumberInput
                            type="number"
                            step="any"
                            placeholder="Amount of cryptocurrency"
                          />
                          <Button>Remove</Button>
                        </StyledCol>
                      </ModalForm>
                    </BriefcaseItem>
                  );
                })}
          </BriefcaseInfo>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BriefcaseModal;
