import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Row } from "./styles";

type PaginationProps = {
  currentPage: number;
};

const PaginationRow = styled(Row)`
  margin: 20px;
`

const PageBtn = styled.div`
  width: 29px;
  height: 29px;
  padding: 5px;
  border-radius: 50%;
  text-align: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const CurrentPageBtn = styled(PageBtn)`
  background-color: #bebebe;
  font-weight: 500;
`

const Pagination = ({ currentPage }: PaginationProps) => {
  const range = {
    from: 1,
    to: 45,
    
    *[Symbol.iterator]() {
      for (let value = this.from; value <= this.to; value++) {
        yield value;
      }
    },
  };
  
  if(currentPage < range.from || currentPage > range.to) {
    throw new Error('Incorrect current page');
  }

  return (
    <PaginationRow>
          {currentPage === range.from ? <CurrentPageBtn>{range.from}</CurrentPageBtn> : <PageBtn>{range.from}</PageBtn>}
          {currentPage - 3 > range.from ? <PageBtn>...</PageBtn> : <></> }
          {currentPage - 2 > range.from ? <PageBtn>{currentPage - 2}</PageBtn> : <></>}
          {currentPage - 1 > range.from ? <PageBtn>{currentPage - 1}</PageBtn> : <></>}
          {currentPage > range.from && currentPage < range.to ? <CurrentPageBtn>{currentPage}</CurrentPageBtn> : <></>}
          {currentPage + 1 < range.to ? <PageBtn>{currentPage + 1}</PageBtn> : <></>}
          {currentPage + 2 < range.to ? <PageBtn>{currentPage + 2}</PageBtn> : <></>}
          {currentPage + 3 < range.to ? <PageBtn>...</PageBtn> : <></> }
          {currentPage === range.to ? <CurrentPageBtn>{range.to}</CurrentPageBtn> : <PageBtn>{range.to}</PageBtn>}
    </PaginationRow>
  );
};

export default Pagination;
