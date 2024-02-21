import ReactPaginate from "react-paginate";

const PaginateArticle = ({
  itemsPerPage,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageCount = Math.ceil(totalPages / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    const page = selected + 1;
    setCurrentPage(page);
  };

  return (
    <div>
      <style>
        {`.list-paginate a {
            background-color: #EAF4FB;
            color: #2b95f6;
            padding: 4px 12px;
            border-radius: 6px;
            display: block
          }
          
          .list-paginate a:hover {
            background-color: #d1e8f8;
          }

          .list-paginate .previous.disabled a:hover,
          .list-paginate .next.disabled a:hover {
            background-color: #EAF4FB;
            cursor: default;
          }

          .list-paginate .previous.disabled svg path,
          .list-paginate .next.disabled svg path {
            fill: #94A3B8;
          }

          .list-paginate .selected a {
           background-color: #2b95f6;
           color: #fff;
          }`}
      </style>
      <div className="flex gap-1">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          initialPage={currentPage - 1}
          className="list-paginate flex gap-1"
          breakLabel={"..."}
          previousLabel={
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.02332 10.0001L13.1483 14.1251L11.97 15.3034L6.66665 10.0001L11.97 4.69678L13.1483 5.87511L9.02332 10.0001Z"
                fill="#4099FF"
              />
            </svg>
          }
          nextLabel={
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9767 9.99989L6.85168 5.87489L8.03002 4.69656L13.3334 9.99989L8.03002 15.3032L6.85168 14.1249L10.9767 9.99989Z"
                fill="#4099FF"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default PaginateArticle;
