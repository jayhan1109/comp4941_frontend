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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:30735/api/Services",
        formData
      );
    } catch (error) {
      console.error(error);
    }
    history.push("/service");
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:30735/api/Units")
        .then((res) => setUnits(res.data));
    } catch (error) {}
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Price </label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            name="price"
            value={formData.price}
          />
        </div>
        <div className="form-group">
          <label> Service Name </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="serviceName"
            value={formData.serviceName}
          />
        </div>
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
                    }}
                  >
                    Unit # {unit.unitId}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateService;
