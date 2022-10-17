import { Form, Link } from "@remix-run/react";
import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  *{
    margin :0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

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
  align-items: center;
  max-width: 1440px;
  width: 95%;
`;

export const B = styled.b`
  font-weight: 500;
`;

export const RedSpan = styled.span`
  color: #f44336;
`;

export const GreenSpan = styled.span`
  color: #18c683;
`;

type FlexProps = {
  maxWidth?: string;
  minWidth?: string;
  width?: string;
  maxHeight?: string;
  minHeight?: string;
  height?: string;
  align?: string;
  justify?: string;
  wrap?: string;
};

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;

  width: ${(props) => (props.width ? props.width : "auto")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "auto")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "auto")};;
  height: ${(props) => (props.height ? props.height : "auto")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "auto")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "auto")};
  align-items: ${(props) => (props.align ? props.align : "initial")};
  justify-content: ${(props) =>
  props.justify ? props.justify : "space-between"};
  flex-wrap: ${(props) => (props.wrap ? props.wrap : "initial")};
`;
export const Col = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;

  width: ${(props) => (props.width ? props.width : "auto")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "auto")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "auto")};;
  height: ${(props) => (props.height ? props.height : "auto")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "auto")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "auto")};
  align-items: ${(props) => (props.align ? props.align : "initial")};
  justify-content: ${(props) =>
  props.justify ? props.justify : "space-between"};
  flex-wrap: ${(props) => (props.wrap ? props.wrap : "initial")};
`;

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

export const Modal = styled.div`
height: 100%;
width : 100%;
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: rgba(0,0,0,0.5);
display: flex;
align-items: center;
justify-content: center;
`

export const ModalContent = styled.div`
  max-width: 500px;
  width: 95%;
  background-color: white;
  border-radius: 5px;
`

export const ModalHeader = styled.div`
  padding: 1em;
  border-bottom: 1px solid #c4c4c4;
`

export const ModalBody = styled.div`
  width: 100%;
  padding: 1em;
  `

export const ModalForm = styled(Form)`
  width: 100%;
`

export const NumberInput = styled.input`
  width: inherit;
  padding: 5px 10px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1em;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;  
  }
`

export const Button = styled.button`
  padding: 5px 10px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(34, 130, 255);
  color: white;
  font-weight: 500;
  font-size: 0.9em;
  transition: background-color 300ms;


  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgb(80, 156, 255);
    cursor: pointer;
    
  }
`

export const Logo = styled.h1`
  margin: 10px 30px;
  padding: 2px;
  border: 2px solid black;
  border-radius: 4px;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  color: #3b3b3b;
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Briefcase = styled.span`
  padding: 10px 30px;
  font-size: 1.2em;
  font-weight: 500;
  align-self: right;
`;

export const Cryptocurrencies = styled(Row)`

  @media (max-width: 600px) {
    display: none;
  }
`

export const Cryptocurrency = styled.span`
  padding: 15px;
  font-size: 0.95em;
`;