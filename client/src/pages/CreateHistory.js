import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import {useHistory} from 'react-router-dom';

const CreateHistory = () => {
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [clients, setClients] = useState(null);
  const [units, setUnits] = useState(null);
  const [selectedClient, setSelectedClient] = useState("Client #");
  const [selectedUnit, setSelectedUnit] = useState("Unit #");
  const [services, setServices] = useState(null);
  const [selectedServices, setSelectedServices] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date())
  const history = useHistory();


  const onUnitChange = (id, price) => {
    axios.get('http://localhost:30735/api/Services').then((res)=> {
        const tempServices = res.data.filter((service) => service.unitId == id)
        setServices(tempServices);
    })
    setUnitPrice(price)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({price: totalServicePrice+ unitPrice, startDate, endDate, unitId: selectedUnit, clientId: selectedClient})
    axios.post('http://localhost:30735/api/Histories', 
      {totalPrice: totalServicePrice+ unitPrice, startDate, endDate, unitId: selectedUnit, clientId: selectedClient})
      .then((res) => {
        console.log(res)
        selectedServices.map(service => {
          service.historyId = res.data.historyId
          console.log(service)
          axios.post('http://localhost:30735/api/HistoryServices', service);
        })
    })
    history.push('/history');
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
      <form onSubmit={onSubmit}>
        <div className="form-group m-0">
          <label> Choose a Client</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Client # {selectedClient}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {clients &&
                clients.map((client) => (
                  <Dropdown.Item
                    key={client.clientId}
                    onClick={(e) => {
                      setSelectedClient(client.clientId);
                    }}
                  >
                    Client # {client.clientId}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="form-group mt-3">
          <label> Choose a Unit</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Unit # {selectedUnit}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {units &&
                units.map((unit) => (
                  <Dropdown.Item
                    key={unit.unitId}
                    onClick={(e) => {
                      setSelectedUnit(unit.unitId);
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
          <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
         
        </div>
        <div>
           <DatePicker selected={endDate} onChange={date => setEndDate(date)}/>
        </div>
        <div className="mt-5">
            {services && services.map((service) => (
                <div className="form-check" key={service.serviceId}>
                    <input className="form-check-input" type="checkbox" 
                      onChange={(e) => {
                        if(e.target.checked) {
                          setTotalServicePrice(totalServicePrice + service.price)
                          setSelectedServices(arr=> [...arr, {serviceName: service.serviceName, servicePrice: service.price, serviceId: service.serviceId}])
                        } 
                        else {
                          setTotalServicePrice(totalServicePrice - service.price)
                          setSelectedServices(selectedServices.filter(item => item.serviceId != service.serviceId))
                        }
                      }
                      }/>
                    <label>
                        Service # {service.serviceId} {service.serviceName} - {service.price}
                    </label>
                </div>
            ))}
        </div>
        <div className="mt-3">
          Price: {unitPrice + totalServicePrice}
        </div>
        <button className="btn btn-primary mt-5" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateHistory;
