import { Line } from "react-chartjs-2";
import styled from "styled-components";

export const StyledLine = styled(Line)`
  max-height: 720px;

  @media (max-width: 1920px) {
    max-height: 600px;
  }

  @media (max-width: 1000px) {
    max-height: 400px;
  }
`;
