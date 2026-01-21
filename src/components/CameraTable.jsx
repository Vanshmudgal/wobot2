import React from 'react';
// Changed 'CircleOff' to 'Ban' to match your image
import { Ban, CheckCircle2, Trash2 } from 'lucide-react'; 

/**
 * CameraTable Component
 */
const CameraTable = ({ cameras, onToggleStatus, onDelete }) => {
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
              {/* Checkbox */}
              <td className="checkbox-cell">
                <input type="checkbox" aria-label={`Select ${cam.name}`} />
              </td>

              {/* Name & Identity */}
              <td>
                <div className="name-cell">
                  <div className={`status-dot ${cam.status === 'Active' ? 'active-dot' : 'inactive-dot'}`}></div>
                  <div>
                    <div className="camera-name">{cam.name}</div>
                    <div className="camera-email">admin@wobot.ai</div>
                  </div>
                </div>
              </td>

              {/* Info Columns */}
              <td className="info-text">{cam.model}</td>
              <td className="info-text">{cam.location}</td>
              <td className="info-text">{cam.ip_address}</td>
              <td className="info-text">{cam.resolution}</td>

              {/* Status Badge */}
              <td className="status-cell">
                <span className={`status-pill ${cam.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {cam.status}
                </span>
              </td>

              {/* ACTIONS: Toggle & Delete */}
              <td className="actions-cell">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  
                  {/* Disable/Activate Button */}
                  <button 
                    onClick={() => onToggleStatus(cam.id, cam.status)} 
                    className="action-btn"
                    title={cam.status === 'Active' ? "Deactivate Camera" : "Activate Camera"}
                  >
                    {cam.status === 'Active' ? (
                      // UPDATED: Used 'Ban' icon here to match your image
                      <Ban className="icon-btn action-icon-inactive" size={18} style={{ color: '#6B7280' }} />
                    ) : (
                      <CheckCircle2 className="icon-btn action-icon-active" size={18} />
                    )}
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => onDelete(cam.id)} 
                    className="action-btn"
                    title="Delete Camera"
                    style={{ color: '#EF4444' }} 
                  >
                    <Trash2 className="icon-btn" size={18} />
                  </button>
                  
                </div>
              </td>
            </tr>
          ))
        ) : (
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