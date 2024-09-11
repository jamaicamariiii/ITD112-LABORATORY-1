import React from "react";
import AddDengueData from "./Components/AddDengueData";
import DengueDataList from "./Components/DengueDataList";
import CsvUploader from "./Components/CsvUploader"; // Uncomment this if you implement CSV upload 

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title"></h1>
      </header>
      <div className="container">
        <div className="form-section">
          <AddDengueData />
          <CsvUploader /> {/* Add the CsvUploader component here */}
        </div>
        <div className="list-section">
          <DengueDataList />
        </div>
      </div>
    </div>
  );
}

export default App;
