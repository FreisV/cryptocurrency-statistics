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
`;

export const RedSpan = styled.span`
  color: #f44336;
`;

export const GreenSpan = styled.span`
  color: #18c683;
`;

type FlexProps = {
  maxWidth?:string;
  width?: string;
  maxHeight?: string;
  height?: string;
  align?: string;
  justify?: string;
}

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  
  width: ${props => props.width ? props.width : 'auto'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};;
  max-height: ${props => props.maxHeight ? props.maxHeight : 'auto'};;
  align-items: ${props => props.align ? props.align : 'initial'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
`
export const Col = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;

  width: ${props => props.width ? props.width : 'auto'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};;
  max-height: ${props => props.maxHeight ? props.maxHeight : 'auto'};;
  align-items: ${props => props.align ? props.align : 'initial'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
`

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 70px;
  margin-bottom: 30px;
  color: #3b3b3b;

  
  -webkit-box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);
  -moz-box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);
  box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);

`;
