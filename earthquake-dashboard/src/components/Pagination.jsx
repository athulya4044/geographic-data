export default function Pagination({
  currentPage,
  totalEntries,
  entriesPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

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
        {/* First */}
        <button
          className={buttonClass(!isFirstPage)}
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
        >
          « First
        </button>

        {/* Prev */}
        <button
          className={buttonClass(!isFirstPage)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          ‹ Prev
        </button>

        {/* Current Page */}
        <span className="px-4 py-1 rounded-full bg-teal-100 text-teal-700 border border-teal-300">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          className={buttonClass(!isLastPage)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          Next ›
        </button>

        {/* Last */}
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
