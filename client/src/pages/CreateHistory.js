import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

const CreateHistory = () => {
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [clients, setClients] = useState(null);
  const [units, setUnits] = useState(null);
  const [selectedClient, setSelectedClient] = useState("Client #");
  const [selectedUnit, setSelectedUnit] = useState("Unit #");
  const [services, setServices] = useState(null);

  const onUnitChange = (id, price) => {
    axios.get('http://localhost:30735/api/Services').then((res)=> {
        const tempServices = res.data.filter((service) => service.unitId == id)
        setServices(tempServices);
    })
    setUnitPrice(price)
  }

  useEffect(() => {
    axios.get("http://localhost:30735/api/Clients").then((res) => {
      setClients(res.data);
    });

    axios.get("http://localhost:30735/api/Units").then((res) => {
      setUnits(res.data);
    });
  }, []);

  return (
    <div>
      <form>
        <div className="form-group">
          <label> Choose a Client</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedClient}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {clients &&
                clients.map((client) => (
                  <Dropdown.Item
                    key={client.clientId}
                    onClick={(e) => {
                      setSelectedClient(`Client # ${client.clientId}`);
                    }}
                  >
                    Client # {client.clientId}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="form-group">
          <label> Choose a Unit</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedUnit}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {units &&
                units.map((unit) => (
                  <Dropdown.Item
                    key={unit.unitId}
                    onClick={(e) => {
                      setSelectedUnit(`Unit # ${unit.unitId}`);
                      onUnitChange(unit.unitId, unit.price);
                    }}
                    
                  >
                    Unit # {unit.unitId}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
            {services && services.map((service) => (
                <div className="form-check" key={service.serviceId}>
                    <input className="form-check-input" type="checkbox" onChange={(e) => e.target.checked ? setTotalServicePrice(totalServicePrice + service.price) : setTotalServicePrice(totalServicePrice - service.price)}/>
                    <label>
                        Service # {service.serviceId} {service.serviceName} - {service.price}
                    </label>
                </div>
            ))}
        </div>
        <div>
          Price: {unitPrice}
        </div>
      </form>
    </div>
  );
};

export default CreateHistory;
