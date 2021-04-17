import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Service = () => {
  const [services, setService] = useState(null);

  useEffect(() => {
    const getService = async () => {
      const { data } = await axios.get(
        "https://comp4945projectsprint.azurewebsites.net/api/Services"
      );
      setService(data);
      console.log(data);
    };
    getService();
  }, []);

  if (services) {
    return (
      <>
        <Link to="/createService"> Create a service</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Service Id</th>
              <th scope="col">Price</th>
              <th scope="col">Service Name</th>
              <th scope="col">Unit Id</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.serviceId}>
                <td>{service.serviceId}</td>
                <td>{service.price}</td>
                <td>{service.serviceName}</td>
                <td>{service.unitId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return <></>;
  }
};

export default Service;
