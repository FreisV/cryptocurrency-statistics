import { Form } from "@remix-run/react"
import styled from "styled-components"

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
  max-height: 610px;
  background-color: white;
  border-radius: 5px;
`

export const ModalHeader = styled.div`
  padding: 1em;
  border-bottom: 1px solid #c4c4c4;
`

export const ModalBody = styled.div`
  width: 100%;
  max-height: 558px;
  padding: 1em;
  overflow: auto;
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
