interface IPaginate {
  numOfResults: number;
  currentPage: number;
  itemsPerPage: number;
}

interface IPaginateResult {
  offset: number;
  numOfPages: number;
  hasMore: boolean;
}

const paginator = (params: IPaginate): IPaginateResult => {
  console.log(params);
  const numOfPages = Math.ceil(params.numOfResults / params.itemsPerPage);
  return {
    numOfPages,
    /* 
        offset should be like 
          page:1 ->  0
          page:2 ->   25
          page:3 ->   50
    */
    offset:
      (params.currentPage > 1 ? params.currentPage - 1 : 0) *
      params.itemsPerPage,
    hasMore: params.currentPage < numOfPages,
  };
};

export default paginator;
