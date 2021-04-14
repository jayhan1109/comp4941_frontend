import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const CreateService = () => {
  const [units, setUnits] = useState(null);
  const history = useHistory();
  const [formData, setFormData] = useState({
    price: 0,
    serviceName: "",
    unitId: "Choose unit #",
  });
  const [dropDown, setDropDown] = useState("Choose unit #");
  const [errorMsg, setErrorMsg] = useState("");
  const [isUnit, setIsUnit] = useState(null);

  const onChange = (e) => {
    setErrorMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formData.serviceName === "") {
      setErrorMsg("Service cannot be empty.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isUnit === null) {
      alert("Please select unit number.");
    } else {
      try {
        const res = await axios.post("http://localhost:30735/api/Services", formData);
      } catch (error) {
        console.error(error);
      }
      history.push("/service");
    }
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:30735/api/Units").then((res) => setUnits(res.data));
    } catch (error) {}
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Price </label>
          <input
            required
            type="number"
            pattern="[0-9]*"
            className="form-control"
            onChange={onChange}
            name="price"
            value={formData.price}
          />
        </div>
        {formData.price < 0 ? (
          <>
            <p style={{ color: "red" }}>The price value cannot be negative.</p>
          </>
        ) : null}
        <div className="form-group">
          <label> Service Name </label>
          <input
            required
            type="text"
            className="form-control"
            onChange={onChange}
            name="serviceName"
            value={formData.serviceName}
          />
        </div>
        <p style={{ color: "red" }}>{errorMsg}</p>
        <div className="form-group">
          <label> Choose your unit # </label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {dropDown}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {units &&
                units.map((unit) => (
                  <Dropdown.Item
                    key={unit.unitId}
                    onClick={(e) => {
                      setDropDown(`Unit # ${unit.unitId}`);
                      setFormData({ ...formData, unitId: unit.unitId });
                      setIsUnit(`Unit # ${unit.unitId}`);
                    }}
                  >
                    Unit # {unit.unitId}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateService;
