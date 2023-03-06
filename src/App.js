import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "react-bootstrap/Table";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const[salary,setSalary]=useState(0);
  

  const handleData = () => {
    axios.get("http://localhost:8080/data").then((res) => setData(res.data));
    console.log(data);
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleSubmit = () => {
    let date = new Date();

    let Day = date.getDate();
    let Month = date.getMonth() + 1;
    let Year = date.getFullYear();
    let completeDate = `${Day}/${Month}/${Year}`;

    let id = uuidv4();
    console.log(data);
    axios
      .post("http://localhost:8080/data", {
        Id: id,
        Department: department,
        Name: name,
        Salary: salary,
        Joining: completeDate,
      })

      .then(() => {
        handleData();
      });
      setDepartment("");
      setName("");
      setSalary("");


  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Department management system</h1>
        <div className="inputBx">
          
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              name=""
              id=""
            >
              <option value="">Select department</option>
              <option value="Developer">developer</option>
              <option value="HR">Hr</option>
              <option value="Manager">Manager</option>
            </select>
          
        </div>
       
        <div className="inputBx">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee Name"
            required
          />
        </div>
        <div className="inputBx">
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
            required
          />
        </div>

        <div className="inputBx">
          <button onClick={handleSubmit} disabled={!(department && name)}>
            Submit
          </button>
        </div>
        <div className="data_wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Department</th>
                <th>Employee Name</th>
                <th>Emloyee salary</th>
                <th>Date Of Joining</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={item.Id}>
                    <td>{i + 1}</td>
                    <td>{item.Department}</td>
                    <td>{item.Name}</td>
                    <td>{item.Salary}</td>
                    <td>{item.Joining}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
