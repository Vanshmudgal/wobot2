import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, MapPin, ChevronDown, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  CircleOff, CheckCircle2, Wifi
} from 'lucide-react';

import brand from "./brand.svg";
import './Hello.css';

function Hello() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [locationFilter, setLocationFilter] = useState("All"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const TOKEN = import.meta.env.VITE_APITOKEN;
  const BASE_URL = import.meta.env.VITE_URL;

  const fetchCameras = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/fetch/cameras`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const rawCameras = res.data.data?.cameras || [];
      const mappedData = rawCameras.map((cam) => ({
        id: cam.id, 
        name: cam.name,
        location: cam.location,
        status: cam.status?.toLowerCase() === 'active' ? 'Active' : 'Inactive', 
        ip_address: cam.ip_address,
        model: cam.model,
        resolution: cam.resolution
      }));
      setData(mappedData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCameras(); }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatusPayload = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await axios.post(`${BASE_URL}/update/camera/status`, 
        { id: id, status: newStatusPayload },
        { headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" } }
      );
      setData(prev => prev.map(cam => cam.id === id ? { ...cam, status: newStatusPayload } : cam));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleFilterChange = (type, value) => {
    if (type === 'location') setLocationFilter(value);
    if (type === 'status') setStatusFilter(value);
    if (type === 'search') setSearchTerm(value);
    setCurrentPage(1); 
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const filteredCameras = data.filter((cam) => {
    const matchesSearch = cam.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || cam.status === statusFilter;
    const matchesLocation = locationFilter === "All" || cam.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const totalItems = filteredCameras.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCameras.slice(indexOfFirstItem, indexOfLastItem);
  const uniqueLocations = [...new Set(data.map(c => c.location))];

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="container">
      <div className="brand-wrapper">
        <img src={brand} alt="Wobot.ai" className="brand-logo" />
      </div>

      <div className="main-content">
        <div className="header-row">
          <div className="header-text">
            <h1>Cameras</h1>
            <p>Manage your cameras here.</p>
          </div>

          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="search" 
              className="search-input"
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <Search className="search-icon" />
          </div>
        </div>

        <div className="filters-row">
          <div className="select-wrapper">
            <MapPin className="select-icon-left" />
            <select className="custom-select" onChange={(e) => handleFilterChange('location', e.target.value)}>
              <option value="All">Location</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <ChevronDown className="select-icon-right" />
          </div>

          <div className="select-wrapper">
            <Wifi className="select-icon-left" style={{transform: 'rotate(45deg) translateY(-50%)', top: '50%'}} />
            <select className="custom-select" onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="select-icon-right" />
          </div>
        </div>

        <div className="table-card">
          <table className="camera-table">
            <thead>
              <tr>
                <th className="checkbox-cell"><input type="checkbox" /></th>
                <th>Name</th>
                <th>Model</th>
                <th>Location</th>
                <th>Recorder</th>
                <th>Tasks</th>
                <th className="status-cell">Status</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cam) => (
                <tr key={cam.id} className="table-row">
                  <td className="checkbox-cell"><input type="checkbox" /></td>
                  <td>
                    <div className="name-cell">
                      <div className={`status-dot ${cam.status === 'Active' ? 'active-dot' : 'inactive-dot'}`}></div>
                      <div>
                        <div className="camera-name">{cam.name}</div>
                        <div className="camera-email">admin@wobot.ai</div>
                      </div>
                    </div>
                  </td>
                  <td className="info-text">{cam.model}</td>
                  <td className="info-text">{cam.location}</td>
                  <td className="info-text">{cam.ip_address}</td>
                  <td className="info-text">{cam.resolution}</td>
                  <td className="status-cell">
                    <span className={`status-pill ${cam.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {cam.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button onClick={() => toggleStatus(cam.id, cam.status)} className="action-btn">
                      {cam.status === 'Active' ? 
                        <CircleOff className="icon-btn action-icon-inactive" /> : 
                        <CheckCircle2 className="icon-btn action-icon-active" />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-footer">
            {/* FIXED: New wrapper class for correct alignment */}
            <div className="pagination-dropdown-wrapper">
              <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="pagination-select">
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              {/* FIXED: New class for centered icon */}
              <ChevronDown className="pagination-select-icon" />
            </div>

            <span className="pagination-info">
              {totalItems > 0 ? `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, totalItems)}` : '0-0'} of {totalItems}
            </span>

            <div className="pagination-controls">
              <ChevronsLeft onClick={() => setCurrentPage(1)} className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`} />
              <ChevronLeft onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={`icon-btn ${currentPage === 1 ? 'icon-disabled' : ''}`} />
              <ChevronRight onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className={`icon-btn ${currentPage === totalPages || totalPages === 0 ? 'icon-disabled' : ''}`} />
              <ChevronsRight onClick={() => setCurrentPage(totalPages)} className={`icon-btn ${currentPage === totalPages || totalPages === 0 ? 'icon-disabled' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hello;