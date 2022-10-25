import { Link } from "@remix-run/react";
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0px;
`;

export const Th = styled.th`
  text-align: ${(props) => (props.align ? props.align : "end")};

  padding: 1em;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 500;
  font-size: 1em;
  padding: 1em 1.5em;

  &:nth-child(2) {
    width: 20%;
  }
`;

export const Td = styled.td`
  text-align: ${(props) => (props.align ? props.align : "end")};

  border-bottom: 1px solid #c4c4c4;
  font-size: 0.9em;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: rgb(248, 250, 253);
    cursor: pointer;
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: 1.5em;
  color: black;
  text-decoration: none;
`;

export const Add = styled.button`
  font-size: 1.5em;
  font-weight: 300;
  transition: font-size 100ms;
  border: none;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    font-size: 2em;
    cursor: pointer;
  }
`;
