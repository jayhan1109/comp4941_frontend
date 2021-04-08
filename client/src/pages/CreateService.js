import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateService = () => {
  useEffect(() => {
    try {
      axios
        .get("http://localhost:30735/api/Units")
        .then((res) => console.log(res));
    } catch (error) {}
  }, []);
  const [formData, setFormData] = useState({
    price: 0,
    serviceName: "",
    unitId: 0,
  });
  const history = useHistory();
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
            type="number"
            className="form-control"
            onChange={onChange}
            name="serviceName"
            value={formData.serviceName}
          />
        </div>
        <div className="form-group">
          <label> unitId </label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            name="unitId"
            value={formData.unitId}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateService;
