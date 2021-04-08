import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Unit() {
  const [units, setUnits] = useState(null);

  useEffect(() => {
    const getUnits = async () => {
      const { data } = await axios.get("http://localhost:30735/api/Units");
      setUnits(data);
    };
    getUnits();
  }, []);

  if (units) {
    return (
      <div>
        <Link to="/createunit">Create unit</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Unit Id</th>
              <th scope="col">Price</th>
              <th scope="col">Appliance</th>
              <th scope="col">Occupied</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.unitId}>
                <td>{unit.unitId}</td>
                <td>{unit.price}</td>
                <td>{unit.appliance === false ? <p>No</p> : <p>Yes</p>}</td>
                <td>{unit.isOccupied === false ? <p>No</p> : <p>Yes</p>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/createunit">Create unit</Link>
        <div>No unit yet</div>
      </div>
    );
  }
}

export default Unit;
