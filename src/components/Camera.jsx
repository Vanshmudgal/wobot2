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
 * Camera Component (Main Dashboard)
 */
function Camera() {
  // --- State Hooks ---
  const [data, setData] = useState([]);               
  const [loading, setLoading] = useState(true);        
  const [searchTerm, setSearchTerm] = useState("");    
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [locationFilter, setLocationFilter] = useState("All"); 
  const [currentPage, setCurrentPage] = useState(1);   
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  // Environment variables
  const TOKEN = import.meta.env.VITE_APITOKEN;
  const BASE_URL = import.meta.env.VITE_URL;

  // --- API: Fetch Data ---
  const fetchCameras = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/fetch/cameras`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      
      const mappedData = (res.data.data?.cameras || []).map(cam => ({
        ...cam,
        status: cam.status?.toLowerCase() === 'active' ? 'Active' : 'Inactive'
      }));
      
      setData(mappedData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Action: Toggle Status ---
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await axios.post(`${BASE_URL}/update/camera/status`, 
        { id, status: newStatus },
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      
      setData(prev => prev.map(cam => cam.id === id ? { ...cam, status: newStatus } : cam));
    } catch (err) {
      console.error("Update failed:", err);
      alert("Status update failed.");
    }
  };

  // --- NEW Action: Delete Camera ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this camera?");
    if (!confirmDelete) return;

    try {
      // API call (Uncomment if backend supports delete)
      /* await axios.delete(`${BASE_URL}/delete/camera`, { 
        data: { id },
        headers: { Authorization: `Bearer ${TOKEN}` } 
      }); 
      */

      // Optimistic UI Update: Remove item from list immediately
      setData(prevData => prevData.filter(cam => cam.id !== id));
      
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete camera.");
    }
  };

  // Initial Load
  useEffect(() => { 
    fetchCameras(); 
  }, []);

  // --- Filtering Logic ---
  const filteredData = data.filter(cam => 
    cam.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || cam.status === statusFilter) &&
    (locationFilter === "All" || cam.location === locationFilter)
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="loading-screen">Loading Systems...</div>;

  return (
    <div className="container">
      <div className="brand-wrapper">
        <img src={brand} alt="Wobot.ai Dashboard" className="brand-logo" />
      </div>

      <div className="main-content">
        <Header onSearch={(val) => { setSearchTerm(val); setCurrentPage(1); }} />
        
        <FilterBar 
          locations={[...new Set(data.map(c => c.location))]}
          onLocationChange={(val) => { setLocationFilter(val); setCurrentPage(1); }}
          onStatusChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        />

        <div className="table-card">
          {/* Passed onDelete prop here */}
          <CameraTable 
            cameras={currentItems} 
            onToggleStatus={toggleStatus} 
            onDelete={handleDelete} 
          />
          
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

export default Camera;