import styled from "styled-components";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import BriefcaseModalItem from "./BriefcaseModalItem";
import {
  Col,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
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
              ? "Briefcase empty"
              : briefcase.map(el => <BriefcaseModalItem item={el} key={el.cryptocurrency.id}/>
              )}
          </BriefcaseInfo>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BriefcaseModal;
