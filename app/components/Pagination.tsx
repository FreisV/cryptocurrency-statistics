import { Link } from "@remix-run/react";
import { Row } from "./styles";

type PaginationProps = {
  currentPage: number;
};

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
  const pages = [...range];

  return (
    <Row>
      <Row>
          <div>{range.from}</div>
          {currentPage - 3 > range.from ? <div>...</div> : <></> }
          {currentPage - 2 > range.from ? <div>{currentPage - 2}</div> : <></>}
          {currentPage - 1 > range.from ? <div>{currentPage - 1}</div> : <></>}
          {currentPage > range.from && currentPage < range.to ? <div>{currentPage}</div> : <></>}
          {currentPage + 1 < range.to ? <div>{currentPage + 1}</div> : <></>}
          {currentPage + 2 < range.to ? <div>{currentPage + 2}</div> : <></>}
          {currentPage + 3 < range.to ? <div>...</div> : <></> }
          <div>{range.to}</div>
        </Row>
    </Row>
  );
};

export default Pagination;
