import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Unit() {
  const [units, setUnits] = useState(null);

  useEffect(() => {
    const getUnits = async () => {
      const { data } = await axios.get("http://localhost:30735/api/Units");
      setUnits(data);
    };
    getUnits();
  }, []);

  const removeUnit = async (unitId) => {
    await axios.delete(`http://localhost:30735/api/Units/${unitId}`).then((response) => {
      setUnits(
        units.filter((val) => {
          return val.unitId !== unitId;
        })
      );
    });
  };

  // const editUnit = () => {
  //   axios.put("http://localhost:30735/api/Units", )
  // }

  if (units) {
    return (
      <div>
        <Link to="/createunit">Create unit</Link>
        <br />

        <br />
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
                <td>
                  {unit.isOccupied === false ? <p>No</p> : <p>Yes</p>}
                </td> <Button>Edit</Button>{" "}
                <Button onClick={() => removeUnit(unit.unitId)}>Delete</Button>
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
