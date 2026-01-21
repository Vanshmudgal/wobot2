import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-footer">
      <div className="pagination-dropdown-wrapper">
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))} 
          className="pagination-select"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        {/* Adjusted icon size and stroke for the "downward arrow" */}
        <ChevronDown size={14} strokeWidth={2} className="pagination-select-icon" />
      </div>

      <span className="pagination-info">
        {totalItems > 0 ? `${start}-${end}` : '0-0'} of {totalItems}
      </span>

      <div className="pagination-controls">
        <button 
          onClick={() => onPageChange(1)} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
        >
          <ChevronsLeft size={18} strokeWidth={1.5} />
        </button>

        <button 
          onClick={() => onPageChange(prev => Math.max(prev - 1, 1))} 
          className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        <button 
          onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>

        <button 
          onClick={() => onPageChange(totalPages)} 
          className={`icon-btn ${currentPage >= totalPages || totalPages === 0 ? 'icon-disabled' : ''}`}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          <ChevronsRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;