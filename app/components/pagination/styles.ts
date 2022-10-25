import { Link } from "@remix-run/react"
import styled from "styled-components"
import { Row } from "../styles/styles"

export const PaginationRow = styled(Row)`
  margin: 20px;
`

export const Dots = styled.div`
  width: 29px;
  height: 29px;
  padding: 5px;
  border-radius: 50%;
  text-align: center;
` 

export const PageBtn = styled(Link)`
  width: 29px;
  height: 29px;
  padding: 5px;
  border-radius: 50%;
  color: black;
  text-align: center;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const CurrentPageBtn = styled(PageBtn)`
  background-color: #e4e4e4;
  font-weight: 600;
`