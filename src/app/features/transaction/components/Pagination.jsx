// apps/web/src/app/features/projects/components/Pagination.jsx
function Pagination({ page, totalPages, onPageChange }) {
  const pages = [];

  // Sayfa numaralarını üret (max 5 sayfa göster)
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        İlk
      </button>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Önceki
      </button>

      <div className="pagination-pages">
        {startPage > 1 && <span className="pagination-ellipsis">...</span>}

        {pages.map((p) => (
          <button
            key={p}
            className={`pagination-page ${p === page ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && (
          <span className="pagination-ellipsis">...</span>
        )}
      </div>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Sonraki
      </button>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        Son
      </button>
    </div>
  );
}

export default Pagination;
