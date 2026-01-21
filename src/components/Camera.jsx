import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Modular Child Components
import Header from './Header';
import FilterBar from './FilterBar';
import CameraTable from './CameraTable';
import Pagination from './Pagination';

// Assets and Styling
import brand from "./brand.svg";
import './Hello.css';

/**
 * Cameras Component (Main Dashboard)
 * * Yeh component application ka "Brain" hai. Iska kaam hai:
 * 1. API se data fetch karna aur use state mein maintain karna.
 * 2. Filtering aur Pagination ki logic handle karna.
 * 3. Child components ko props ke zariye data aur functions pass karna.
 * * @returns {JSX.Element} Poora Camera Management Dashboard.
 */
function Cameras() {
  // --- State Hooks ---
  const [data, setData] = useState([]);               // Raw data stored from the API
  const [loading, setLoading] = useState(true);        // UI loading state for async calls
  const [searchTerm, setSearchTerm] = useState("");    // State for name-based filtering
  const [statusFilter, setStatusFilter] = useState("All"); // State for active/inactive filtering
  const [locationFilter, setLocationFilter] = useState("All"); // State for physical location filtering
  const [currentPage, setCurrentPage] = useState(1);   // Tracks current pagination index
  const [itemsPerPage, setItemsPerPage] = useState(10); // Limits rows per view (10 or 20)

  // Environment variables for secure API access
  const TOKEN = import.meta.env.VITE_APITOKEN;
  const BASE_URL = import.meta.env.VITE_URL;

  /**
   * API: Camera Data Fetching
   * Dashboard load hone par ya refresh karne par data mangwata hai.
   */
  const fetchCameras = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/fetch/cameras`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      
      // Data normalization: API response ko client-side standard format mein map karna
      const mappedData = (res.data.data?.cameras || []).map(cam => ({
        ...cam,
        status: cam.status?.toLowerCase() === 'active' ? 'Active' : 'Inactive'
      }));
      
      setData(mappedData);
    } catch (err) {
      console.error("Fetch Error: API se cameras fetch nahi ho paye.", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * API: Camera Status Update
   * Jab user table mein 'Action' button click karta hai tab toggle handle karta hai.
   * * @param {number|string} id - Camera ki unique ID
   * @param {string} currentStatus - Camera ka maujooda status (Active/Inactive)
   */
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      // Server-side update
      await axios.post(`${BASE_URL}/update/camera/status`, 
        { id, status: newStatus },
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      
      // Optimistic Local Update: State ko update karna taaki UI turant badle
      setData(prev => prev.map(cam => cam.id === id ? { ...cam, status: newStatus } : cam));
    } catch (err) {
      console.error("Update failed: Status badalne mein error aaya.", err);
      alert("Status update nahi ho saka. Kripya dobara koshish karein.");
    }
  };

  // Initial Data Load
  useEffect(() => { 
    fetchCameras(); 
  }, []);

  // --- Derived State Logic ---
  // Pure React pattern: Filtered data ko recalculate karna har render par base states ke hisaab se.
  const filteredData = data.filter(cam => 
    cam.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || cam.status === statusFilter) &&
    (locationFilter === "All" || cam.location === locationFilter)
  );

  // Pagination Calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- Rendering ---

  if (loading) return <div className="loading-screen">Loading Systems...</div>;

  return (
    <div className="container">
      {/* Brand Logo Section */}
      <div className="brand-wrapper">
        <img src={brand} alt="Wobot.ai Dashboard" className="brand-logo" />
      </div>

      <div className="main-content">
        {/* Header: Title and Search Functionality */}
        <Header onSearch={(val) => { setSearchTerm(val); setCurrentPage(1); }} />
        
        {/* FilterBar: Multi-parameter dropdowns */}
        <FilterBar 
          locations={[...new Set(data.map(c => c.location))]} // Extracting unique locations
          onLocationChange={(val) => { setLocationFilter(val); setCurrentPage(1); }}
          onStatusChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        />

        {/* Data Grid Section */}
        <div className="table-card">
          <CameraTable cameras={currentItems} onToggleStatus={toggleStatus} />
          
          {/* Footer Navigation */}
          <Pagination 
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cameras;