import React from 'react';
import { Search } from 'lucide-react';

/**
 * Header Component
 * * Displays the primary dashboard identity and the global search interface.
 * * @param {Object} props
 * @param {Function} props.onSearch - Callback function that transmits the search query 
 * back to the parent component for data filtering.
 */
const Header = ({ onSearch }) => {
  return (
    <div className="header-row">
      {/* Branding and Descriptive Text */}
      <div className="header-text">
        <h1 className="header-title">Cameras</h1>
        <p className="header-subtitle">Manage your cameras here.</p>
      </div>

      {/* Global Search Interface */}
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="search" 
          className="search-input" 
          onChange={(e) => onSearch(e.target.value)} 
          aria-label="Search cameras by name"
        />
        {/* Search icon is positioned absolutely within the wrapper via CSS */}
        <Search className="search-icon" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Header;