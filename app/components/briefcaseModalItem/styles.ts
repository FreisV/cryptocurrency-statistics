import styled from "styled-components";
import { Col } from "../styles/styles";

export const Item = styled(Col)`
width: 100%;
padding: 10px 0;

&:not(:first-child) {
  border-top: 1px solid #c4c4c4;
}
`;