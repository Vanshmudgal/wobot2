import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Modular Child Components
import Header from './Header';
import FilterBar from './FilterBar';
import CameraTable from './CameraTable';
import Pagination from './Pagination';
// Import the new Modal
import DeleteModal from './DeleteModal';

import brand from "./brand.svg";
import './Hello.css';

function Camera() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- NEW: Modal State ---
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);

  const TOKEN = import.meta.env.VITE_APITOKEN;
  const BASE_URL = import.meta.env.VITE_URL;

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
    }
  };

  // --- STEP 1: Triggered when Trash icon is clicked ---
  const handleOpenDeleteModal = (id) => {
    setCameraToDelete(id);
    setDeleteModalOpen(true);
  };

  // --- STEP 2: Triggered when user clicks "Delete" in Modal ---
  const confirmDelete = async () => {
    if (!cameraToDelete) return;

    try {
      // API call goes here
      // await axios.delete...
      
      // Optimistic Update
      setData(prevData => prevData.filter(cam => cam.id !== cameraToDelete));
      
      // Close Modal
      setDeleteModalOpen(false);
      setCameraToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => { 
    fetchCameras(); 
  }, []);

  const filteredData = data.filter(cam => 
    cam.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || cam.status === statusFilter) &&
    (locationFilter === "All" || cam.location === locationFilter)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="loading-screen">Loading Systems...</div>;

  return (
    <div className="container">
      {/* --- NEW: Render Modal Here --- */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
      />

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
          <CameraTable 
            cameras={currentItems} 
            onToggleStatus={toggleStatus} 
            // Pass the modal opener instead of direct delete
            onDelete={handleOpenDeleteModal} 
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