import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CreateUnit() {
  const [price, setPrice] = useState(0);
  const [appliance, setAppliance] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://comp4945projectsprint.azurewebsites.net/api/Units",
      {
        price: price,
        appliance: appliance,
        isOccupied: isOccupied,
      }
    );
    history.push("/unit");
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            <b>Price</b>
          </label>
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
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateUnit;
