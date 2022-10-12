import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1440px;
`

export const RedSpan = styled.span`
  color: #f44336;
`;

export const GreenSpan = styled.span`
  color: #18c683;
`;

type FlexProps = {
  width?: string;
  height?: string;
  align?: string;
  justify?: string;
}

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  
  width: ${props => props.width ? props.width : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};;
  align-items: ${props => props.align ? props.align : 'initial'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
`
export const Col = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;

  width: ${props => props.width ? props.width : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};;
  align-items: ${props => props.align ? props.align : 'initial'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
`