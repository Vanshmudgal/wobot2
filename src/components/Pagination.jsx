import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Pagination Component
 * * Handles navigation logic and row-per-page configuration for data tables.
 * Calculates current display range (e.g., "1-10 of 20") dynamically.
 * * @param {Object} props
 * @param {number} props.totalItems - The total count of filtered records.
 * @param {number} props.itemsPerPage - Number of records displayed per page (10 or 20).
 * @param {number} props.currentPage - The current active page index.
 * @param {number} props.totalPages - Total number of pages based on items per page.
 * @param {Function} props.onPageChange - Callback to update the current page state.
 * @param {Function} props.onItemsPerPageChange - Callback to update the rows-per-page limit.
 */
const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  
  // Logic: Calculate the starting and ending index for the "X-Y of Z" display
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-footer">
      
      {/* Items Per Page Selector */}
      <div className="pagination-dropdown-wrapper">
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))} 
          className="pagination-select"
          aria-label="Select number of items per page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <ChevronDown className="pagination-select-icon" aria-hidden="true" />
      </div>

      {/* Current Range Display */}
      <span className="pagination-info">
        {totalItems > 0 ? `${start}-${end}` : '0-0'} of {totalItems}
      </span>

      {/* Navigation Controls */}
      <div className="pagination-controls">
        {/* Go to First Page */}
        <button 
          onClick={() => onPageChange(1)} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft aria-hidden="true" />
        </button>

        {/* Previous Page */}
        <button 
          onClick={() => onPageChange(prev => Math.max(prev - 1, 1))} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        {/* Next Page */}
        <button 
          onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
          aria-label="Next page"
        >
          <ChevronRight aria-hidden="true" />
        </button>

        {/* Go to Last Page */}
        <button 
          onClick={() => onPageChange(totalPages)} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
          aria-label="Last page"
        >
          <ChevronsRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;