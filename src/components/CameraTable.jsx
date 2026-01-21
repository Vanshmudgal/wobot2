import React from 'react';
import { CircleOff, CheckCircle2 } from 'lucide-react';

/**
 * CameraTable Component
 * * Renders a data grid displaying camera information. 
 * Supports optimistic status updates via a callback function.
 * * @param {Object} props
 * @param {Array} props.cameras - An array of camera objects to display.
 * @param {Function} props.onToggleStatus - Callback function to handle deactivating/activating a camera.
 * @returns {JSX.Element} A styled HTML table matching the Wobot AI dashboard design.
 */
const CameraTable = ({ cameras, onToggleStatus }) => {
  return (
    <table className="camera-table">
      <thead>
        <tr>
          <th className="checkbox-cell">
            <input type="checkbox" aria-label="Select all cameras" />
          </th>
          <th>Name</th>
          <th>Model</th>
          <th>Location</th>
          <th>Recorder (IP)</th>
          <th>Tasks (Res)</th>
          <th className="status-cell">Status</th>
          <th className="actions-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cameras.length > 0 ? (
          cameras.map((cam) => (
            <tr key={cam.id} className="table-row">
              {/* Selection Checkbox */}
              <td className="checkbox-cell">
                <input type="checkbox" aria-label={`Select ${cam.name}`} />
              </td>

              {/* Camera Identity: Includes Status Dot, Name, and Admin Email */}
              <td>
                <div className="name-cell">
                  <div className={`status-dot ${cam.status === 'Active' ? 'active-dot' : 'inactive-dot'}`}></div>
                  <div>
                    <div className="camera-name">{cam.name}</div>
                    <div className="camera-email">admin@wobot.ai</div>
                  </div>
                </div>
              </td>

              {/* Technical Specifications */}
              <td className="info-text">{cam.model}</td>
              <td className="info-text">{cam.location}</td>
              <td className="info-text">{cam.ip_address}</td>
              <td className="info-text">{cam.resolution}</td>

              {/* Status Indicator Badge */}
              <td className="status-cell">
                <span className={`status-pill ${cam.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {cam.status}
                </span>
              </td>

              {/* Contextual Action Button: Toggles between Active/Inactive states */}
              <td className="actions-cell">
                <button 
                  onClick={() => onToggleStatus(cam.id, cam.status)} 
                  className="action-btn"
                  title={cam.status === 'Active' ? "Deactivate Camera" : "Activate Camera"}
                >
                  {cam.status === 'Active' ? (
                    <CircleOff className="icon-btn action-icon-inactive" />
                  ) : (
                    <CheckCircle2 className="icon-btn action-icon-active" />
                  )}
                </button>
              </td>
            </tr>
          ))
        ) : (
          /* Empty State: Displayed if no cameras match the current filters */
          <tr>
            <td colSpan="8" className="no-data-cell" style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
              No cameras found matching the current criteria.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CameraTable;