import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";

function Unit() {
  const [units, setUnits] = useState(null);
  const [price, setPrice] = useState(0);
  const [appliance, setAppliance] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);
  const [unitId, setunitId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getUnits = async () => {
      const { data } = await axios.get(
        "https://comp4945projectsprint.azurewebsites.net/api/Units"
      );
      setUnits(data);
    };
    getUnits();
  }, [units]);

  const removeUnit = async (unitId) => {
    await axios
      .delete(
        `https://comp4945projectsprint.azurewebsites.net/api/Units/${unitId}`
      )
      .then((response) => {
        setUnits(
          units.filter((val) => {
            return val.unitId !== unitId;
          })
        );
      });
  };

  const editUnit = () => {
    axios.put(
      `https://comp4945projectsprint.azurewebsites.net/api/Units/${unitId}`,
      {
        price: price,
        appliance: appliance,
        isOccupied: isOccupied,
        unitId: unitId,
      }
    );
    handleClose();
  };

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.unitId}>
                <td>{unit.unitId}</td>
                <td>{unit.price}</td>
                <td>{unit.appliance === false ? <p>No</p> : <p>Yes</p>}</td>
                <td>{unit.isOccupied === false ? <p>No</p> : <p>Yes</p>}</td>
                <Button
                  className="mt-2"
                  variant="light"
                  onClick={() => removeUnit(unit.unitId)}
                >
                  Delete
                </Button>
                <Button
                  className="mt-2 mr-2"
                  variant="dark"
                  onClick={(e) => {
                    handleShow();
                    setunitId(unit.unitId);
                  }}
                >
                  Edit
                </Button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={editUnit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Unit</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-group">
                <label>Price</label>
                <Form.Control
                  required
                  pattern="[0-9]*"
                  placeholder="Price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                {price < 0 ? (
                  <>
                    <p style={{ color: "red" }}>
                      The price value cannot be negative.
                    </p>
                  </>
                ) : null}
              </div>
              <div className="form-group">
                <Form.Check
                  type="checkbox"
                  label="Appliance"
                  name="appliance"
                  checked={appliance}
                  onChange={() => setAppliance(!appliance)}
                />
              </div>
              <div className="form-group">
                <Form.Check
                  type="checkbox"
                  label="isOccupied"
                  name="isOccupied"
                  checked={isOccupied}
                  onChange={() => setIsOccupied(!isOccupied)}
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" type="submit">
                Save changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
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
