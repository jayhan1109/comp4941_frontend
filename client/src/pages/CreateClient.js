import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateClient = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const history = useHistory();
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

  const onChange = (e) => {
    setFirstNameErrorMsg("");
    setLastNameErrorMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formData.firstName === "") {
      setFirstNameErrorMsg("Name cannot be empty.");
    }
    if (formData.lastName === "") {
      setLastNameErrorMsg("Name cannot be empty.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://comp4945projectsprint.azurewebsites.net/api/Clients",
        formData
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    history.push("/client");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={onChange}
            name="firstName"
            value={formData.firstName}
          />
        </div>
        <p style={{ color: "red" }}>{firstNameErrorMsg}</p>
        <div className="form-group">
          <label>Last Name</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={onChange}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <p style={{ color: "red" }}>{lastNameErrorMsg}</p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
