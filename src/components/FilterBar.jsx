import React from 'react';
import { MapPin, Wifi, ChevronDown } from 'lucide-react';

/**
 * FilterBar Component
 * * Provides a specialized interface for narrowing down the camera list based 
 * on physical location and operational status.
 * * @param {Object} props
 * @param {Array<string>} props.locations - A unique list of locations derived from the camera dataset.
 * @param {Function} props.onLocationChange - Callback triggered when a new location is selected.
 * @param {Function} props.onStatusChange - Callback triggered when a status filter (Active/Inactive) is applied.
 */
const FilterBar = ({ locations, onLocationChange, onStatusChange }) => {
  return (
    <div className="filters-row">
      {/* Location Filter Dropdown */}
      <div className="select-wrapper">
        <MapPin className="select-icon-left" aria-hidden="true" />
        <select 
          className="custom-select" 
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label="Filter by location"
        >
          <option value="All">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <ChevronDown className="select-icon-right" aria-hidden="true" />
      </div>

      {/* Connection Status Filter Dropdown */}
      <div className="select-wrapper">
        {/* Note: Wifi icon is rotated to match the design's "Connection" aesthetic */}
        <Wifi 
          className="select-icon-left" 
          style={{ transform: 'rotate(45deg) translateY(-50%)', top: '50%' }} 
          aria-hidden="true"
        />
        <select 
          className="custom-select" 
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by connection status"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ChevronDown className="select-icon-right" aria-hidden="true" />
      </div>
    </div>
  );
};

export default FilterBar;