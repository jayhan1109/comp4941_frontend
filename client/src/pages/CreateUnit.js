import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CreateUnit() {
  const [price, setPrice] = useState(0);
  const [appliance, setAppliance] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:30735/api/Units", {
      price: price,
      appliance: appliance,
      isOccupied: isOccupied,
    });
    history.push("/unit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Price</label>
          <Form.Control
            placeholder="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
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
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUnit;
