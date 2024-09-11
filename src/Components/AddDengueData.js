import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import DengueDataList from "./DengueDataList"; // Import the DengueDataList component

const AddDengueData = () => {
  const [location, setLocation] = useState("");
  const [cases, setCases] = useState("");
  const [deaths, setDeaths] = useState("");
  const [date, setDate] = useState("");
  const [regions, setRegions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "dengueData"), {
        location,
        cases: Number(cases),
        deaths: Number(deaths),
        date,
        regions,
      });
      setLocation("");
      setCases("");
      setDeaths("");
      setDate("");
      setRegions("");
      alert("Data added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const formStyle = {
    backgroundColor: "#e0f7fa",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px", // Increased maxWidth for more space
    margin: "auto",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px", // Increased padding for better spacing
    margin: "10px 0",
    border: "1px solid #0288d1",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    backgroundColor: "#0288d1",
    color: "white",
    padding: "12px", // Increased padding for button
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px", // Increased font size for button
  };

  const buttonHoverStyle = {
    backgroundColor: "#0277bd",
  };

  // Add centered, blue-colored heading style
  const headingStyle = {
    textAlign: "center", // Centers the heading
    color: "#1e88e5", // Blue font color
    marginBottom: "20px", // Space between heading and form
    fontSize: "24px", // Larger font size for the heading
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2 style={headingStyle}>Enter Dengue Case Information</h2> {/* Centered and blue-colored text */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Cases"
            value={cases}
            onChange={(e) => setCases(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Deaths"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Regions"
            value={regions}
            onChange={(e) => setRegions(e.target.value)}
            style={inputStyle}
            required
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDengueData;
