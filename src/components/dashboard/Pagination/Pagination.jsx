
import ReactPaginate from 'react-paginate';
import "./pagination.css"


export default function PaginatedItems({ itemsPerPage , total ,setPage}) {

  const pageCount = total / itemsPerPage;
  // console.log(pageCount);
  // console.log(total);
  // console.log(itemsPerPage);


  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName=" pagination d-flex align-items-center justify-content-end my-0"
        pageClassName='pagination-tag-anchor mx-2 text-secondary  rounded-circle '
        activeClassName='bg-primary text-white'
      />
    </>
  );
}