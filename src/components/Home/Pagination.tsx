import React from 'react';

/**
 * Pagination Component
 * This component renders pagination controls for navigating between pages.
 */
const Pagination: React.FC<{
  currentPage: string;
  totalPages: number;
  onPageChange: (newPage: string) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage.toString()); // Trigger parent callback
    }
  };

  return (
    <div className="mt-6 flex justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(Number(currentPage) - 1)}
        disabled={Number(currentPage) === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-md ${
            Number(currentPage) === index + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Number(currentPage) + 1)}
        disabled={Number(currentPage) === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
