import { CurrentPageBtn, Dots, PageBtn, PaginationRow } from "./styles/paginationStyles";

type PaginationProps = {
  currentPage: number;
};

const Pagination = ({ currentPage }: PaginationProps) => {
  const range = {
    from: 1,
    to: 46,
    
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
          {currentPage === range.from ? <CurrentPageBtn to={`/?page=${range.from}`}>{range.from}</CurrentPageBtn> : <PageBtn to={`/?page=${range.from}`}>{range.from}</PageBtn>}
          {currentPage - 3 > range.from ? <Dots>...</Dots> : <></> }
          {currentPage - 2 > range.from ? <PageBtn to={`/?page=${currentPage - 2}`}>{currentPage - 2}</PageBtn> : <></>}
          {currentPage - 1 > range.from ? <PageBtn to={`/?page=${currentPage - 1}`}>{currentPage - 1}</PageBtn> : <></>}
          {currentPage > range.from && currentPage < range.to ? <CurrentPageBtn to={`/?page=${currentPage}`}>{currentPage}</CurrentPageBtn> : <></>}
          {currentPage + 1 < range.to ? <PageBtn to={`/?page=${currentPage + 1}`}>{currentPage + 1}</PageBtn> : <></>}
          {currentPage + 2 < range.to ? <PageBtn to={`/?page=${currentPage + 2}`}>{currentPage + 2}</PageBtn> : <></>}
          {currentPage + 3 < range.to ? <Dots>...</Dots> : <></> }
          {currentPage === range.to ? <CurrentPageBtn to={`/?page=${range.to}`}>{range.to}</CurrentPageBtn> : <PageBtn to={`/?page=${range.to}`}>{range.to}</PageBtn>}
    </PaginationRow>
  );
};

export default Pagination;
