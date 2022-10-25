import styled from "styled-components";
import { Button, Col, Row } from "../styles/styles";

export const Info = styled(Col)`
  width: 100%;
  border-color: white;
  padding: 2em;

  -webkit-box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 27px 2px rgba(34, 60, 80, 0.2);
`;

export const H2 = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
`;

export const InfoBlock = styled(Row)`
  width: 60%;
  max-width: 350px;
  height: 80px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const InfoRow = styled(Row)`

  @media (max-width: 660px) {
    font-size: 0.9em;
  }
`

export const Grey = styled.span`
  font-weight: 500;
  color: grey;
  text-transform: uppercase;
`;

export const Symbol = styled.span`
  padding: 5px 0 40px 0;
  font-size: 1em;
`;

export const AdaptiveRow = styled(Row)`
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Btn = styled(Button)`
  width: fit-content;
  margin: 0;
  font-size: 1.2em;
  
  @media (max-width: 600px) {
    font-size: 1.1em;
    margin-top: 30px;
    align-self: flex-end;
  }
`
