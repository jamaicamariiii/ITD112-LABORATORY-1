import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import './DengueDataList.css'; // Import the CSS file
import RadialBarChart from "./RadialBarChart";
import ScatterPlot from "./ScatterPlot"; // Import ScatterPlot component

const ITEMS_PER_PAGE = 20;

const DengueDataList = () => {
  const [dengueData, setDengueData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    location: "",
    cases: "",
    deaths: "",
    date: "",
    regions: "",
  });

  // State for filters
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, "dengueData");
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDengueData(dataList);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const dengueDocRef = doc(db, "dengueData", id);
    try {
      await deleteDoc(dengueDocRef);
      setDengueData(dengueData.filter((data) => data.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({
      location: data.location,
      cases: data.cases,
      deaths: data.deaths,
      date: data.date,
      regions: data.regions,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dengueDocRef = doc(db, "dengueData", editingId);
    try {
      await updateDoc(dengueDocRef, {
        location: editForm.location,
        cases: Number(editForm.cases),
        deaths: Number(editForm.deaths),
        date: editForm.date,
        regions: editForm.regions,
      });
      setDengueData(dengueData.map((data) =>
        data.id === editingId ? { id: editingId, ...editForm } : data
      ));
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Filter data based on input
  const filteredData = dengueData.filter((data) => {
    return (
      (locationFilter === "" || data.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (dateFilter === "" || data.date === dateFilter)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dengue-data-container">
      <h2 className="dengue-data-title">Dengue Data List</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <table className="dengue-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Date</th>
            <th>Regions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data) => (
            <React.Fragment key={data.id}>
              <tr>
                <td>{data.location}</td>
                <td>{data.cases}</td>
                <td>{data.deaths}</td>
                <td>{data.date}</td>
                <td>{data.regions}</td>
                <td>
                  <button onClick={() => handleEdit(data)} className="blue-button">Edit</button>
                  <button onClick={() => handleDelete(data.id)} className="blue-button delete">Delete</button>
                </td>
              </tr>
              {editingId === data.id && (
                <tr>
                  <td colSpan="6">
                    <form onSubmit={handleUpdate} className="edit-form">
                      <input
                        type="text"
                        placeholder="Location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Cases"
                        value={editForm.cases}
                        onChange={(e) => setEditForm({ ...editForm, cases: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Deaths"
                        value={editForm.deaths}
                        onChange={(e) => setEditForm({ ...editForm, deaths: e.target.value })}
                        required
                      />
                      <input
                        type="date"
                        placeholder="Date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Regions"
                        value={editForm.regions}
                        onChange={(e) => setEditForm({ ...editForm, regions: e.target.value })}
                        required
                      />
                      <button type="submit" className="blue-button">Update Data</button>
                      <button type="button" onClick={() => setEditingId(null)} className="blue-button cancel">Cancel</button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="pagination-button" onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>Previous</button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button className="pagination-button" onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>Next</button>
      </div>

      <div className="chart-container">
        <RadialBarChart data={filteredData} />
        <ScatterPlot data={filteredData} />
      </div>
    </div>
  );
};

export default DengueDataList;
