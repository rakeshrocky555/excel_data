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
      const workbook = XLSX.read(data, { type: "binary", sheetRows: 50 });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  function get_output_stroke(){
    //const tokenId = document.querySelector("#value3").value;
    document.getElementById("demo1").innerHTML = Math.floor(Math.random() * 2);
    //setoutput(Math.floor(Math.random() * 2));
  }

  function get_output_diabetes(){
    //const tokenId = document.querySelector("#value3").value;
    document.getElementById("demo2").innerHTML = Math.floor(Math.random() * 2);
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

      <h1>Displaying first 50 records of the Health sheet data</h1>

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
      

      <label for="Age">Age</label>
      <input type = "text" id = "Age" name = "Age"></input>
      <label for="Highchol">Highchol</label>
      <input type = "text" id = "HighChol" name = "HighChol"></input>
      <label for="GenHlth">GenHlth</label>
      <input type = "text" id = "GenHlth" name = "GenHlth"></input>
      <br /><br />
      <label for="DiffWalk">DiffWalk</label>
      <input type = "text" id = "DiffWalk" name = "DiffWalk"></input>
      <label for="Fruits">Fruits</label>
      <input type = "text" id = "Fruits" name = "Fruits"></input>
      <label for="PhysActivity">PhysActivity</label>
      <input type = "text" id = "PhysActivity" name = "PhysActivity"></input>
      <br /><br />
      <label for="HeartDiseaseorAttack">HeartDiseaseorAttack</label>
      <input type = "text" id = "HeartDiseaseorAttack" name = "HeartDiseaseorAttack"></input>
      <label for="PhysHealth">PhysHealth</label>
      <input type = "text" id = "PhysHealth" name = "PhysHealth"></input>
      <br /><br />
      <button onClick={get_output_stroke}>Get predicted value for Stroke</button>
      <p id="demo1">Value:</p>
      <button onClick={get_output_diabetes}>Get predicted value for Diabetes</button>
      <p id="demo2">Value:</p>
      

    </div>
  );
}

export default App;
