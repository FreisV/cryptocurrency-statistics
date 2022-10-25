import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Row } from "../styles/styles";

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  margin-bottom: 30px;
  color: #3b3b3b;

  -webkit-box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);
  -moz-box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);
  box-shadow: 0px 4px 27px 2px rgba(34, 60, 80, 0.17);
`;

export const Logo = styled.h1`
  margin: 10px 30px;
  padding: 2px;
  border: 2px solid black;
  border-radius: 4px;
  text-decoration: none;
  
  @media (max-width: 780px) {
    margin: 10px 10px 10px 15px;
  }

  @media (max-width: 500px) {
    font-size: 1.5em;
  }
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

  &:hover {
    cursor:pointer;
  }

  @media (max-width: 780px) {
    padding: 10px 15px 10px 10px;
  }

`;

export const Cryptocurrencies = styled(Row)`

  @media (max-width: 712px) {
    display: none;
  } 
`

export const Span = styled.span`
  padding: 15px;
  font-size: 0.95em;

  @media (max-width: 930px) {
    padding: 10px;
  }

  @media (max-width: 712px) {
    padding: 0;
  }
`;

export const StyledLink = styled(Link)`
  color: #3b3b3b;
  text-decoration: none;
`;