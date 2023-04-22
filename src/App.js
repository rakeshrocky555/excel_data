import { useState } from "react";
import * as XLSX from "xlsx";

import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [output_data, setoutput] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary", sheetRows: 5 });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  function get_output(){
    //const tokenId = document.querySelector("#value3").value;
    document.getElementById("demo").innerHTML = Math.floor(Math.random() * 2);
    //setoutput(Math.floor(Math.random() * 2));
  }

  return (
    <div className="App">

      <h1>Please upload the input file</h1>

      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />

      <h1>Displaying first five rows of the excel sheet</h1>

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br /><br />
      

      <label for="name">Name</label>
      <input type = "text" id = "name" name = "name"></input>
      <label for="age">Age</label>
      <input type = "text" id = "age" name = "age"></input>
      <button onClick={get_output}>Get predicted value</button>
      <p id="demo">Output is:</p>

    </div>
  );
}

export default App;
