import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Pagination Component
 * * Renders the footer controls for table navigation.
 * * Features:
 * 1. "Rows per page" selector.
 * 2. "Showing X-Y of Z" text indicator.
 * 3. Navigation buttons (First, Previous, Next, Last).
 * * @param {Object} props
 * @param {number} props.totalItems - Total count of records in the dataset.
 * @param {number} props.itemsPerPage - Current limit of items shown per page.
 * @param {number} props.currentPage - The current active page number (1-based).
 * @param {number} props.totalPages - Total number of pages calculated.
 * @param {Function} props.onPageChange - Callback to update the current page.
 * @param {Function} props.onItemsPerPageChange - Callback to update the row limit.
 */
const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  
  // --- Range Calculation Logic ---
  // Calculates the starting index (e.g., Page 2 of 10 items starts at 11)
  const start = (currentPage - 1) * itemsPerPage + 1;
  // Calculates the ending index, ensuring we don't exceed the total count
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-footer">
      
      {/* --- Section 1: Rows Per Page Selector --- */}
      <div className="pagination-dropdown-wrapper">
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))} 
          className="pagination-select"
          aria-label="Select rows per page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        {/* Custom arrow icon to replace default browser select arrow */}
        <ChevronDown size={14} strokeWidth={2} className="pagination-select-icon" />
      </div>

      {/* --- Section 2: Info Text (e.g., "1-10 of 50") --- */}
      <span className="pagination-info">
        {totalItems > 0 ? `${start}-${end}` : '0-0'} of {totalItems}
      </span>

      {/* --- Section 3: Navigation Controls --- */}
      <div className="pagination-controls">
        
        {/* First Page Button */}
        <button 
          onClick={() => onPageChange(1)} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
          title="Go to first page"
        >
          <ChevronsLeft size={18} strokeWidth={1.5} />
        </button>

        {/* Previous Page Button */}
        <button 
          onClick={() => onPageChange(prev => Math.max(prev - 1, 1))} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
          title="Go to previous page"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        {/* Next Page Button */}
        <button 
          onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
          title="Go to next page"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>

        {/* Last Page Button */}
        <button 
          onClick={() => onPageChange(totalPages)} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
          title="Go to last page"
        >
          <ChevronsRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;