import { useTypedSelector } from "~/hooks/useTypedSelector";
import BriefcaseModalItem from "../briefcaseModalItem/BriefcaseModalItem";
import { Info } from "./styles";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../styles/modalStyles";

type BriefcaseModalProps = {
  isHide: boolean;
  setIsHide: (a: boolean) => void;
};

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
          <Info>
            {briefcase.length === 0
              ? "Briefcase empty"
              : briefcase.map((el) => (
                  <BriefcaseModalItem item={el} key={el.cryptocurrency.id} />
                ))}
          </Info>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BriefcaseModal;
