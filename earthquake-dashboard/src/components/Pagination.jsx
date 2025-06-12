// This component handles pagination for a list of entries.
export default function Pagination({
  currentPage,
  totalEntries,
  entriesPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  if (totalPages <= 1) return null;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const buttonClass = (active) =>
    `px-4 py-1 rounded-full border text-sm transition 
    ${
      active
        ? "bg-teal-600 text-white hover:bg-teal-700"
        : "bg-white text-gray-700"
    } 
    border-gray-300`;

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-6 px-6 text-sm">
      <div className="flex flex-wrap gap-2 ">
        <button
          className={buttonClass(!isFirstPage)}
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
        >
          « First
        </button>

        <button
          className={buttonClass(!isFirstPage)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          ‹ Prev
        </button>

        <span className="px-4 py-1 ">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={buttonClass(!isLastPage)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          Next ›
        </button>

        <button
          className={buttonClass(!isLastPage)}
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
        >
          Last »
        </button>
      </div>
    </div>
  );
}
