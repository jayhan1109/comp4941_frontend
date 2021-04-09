import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";

const Client = () => {
  const [clients, setClients] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get("http://localhost:30735/api/Clients");
      setClients(data);
    };
    getClients();
  }, [clients]);

  const onClick = (id) => {
    axios.delete(`http://localhost:30735/api/Clients/${id}`);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, setFormData] = useState({ firstName: "", lastName: "", clientId: '' });

  const onEdit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:30735/api/Clients/${formData.clientId}`, formData);
    handleClose();
  };

  if (clients) {
    return (
      <>
        <Link to="/createclient">Create a client</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">client Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.clientId}>
                <td>{client.clientId}</td>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm mr-1"
                    onClick={(e) => onClick(client.clientId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={(e) => {
                      handleShow();
                      setFormData({
                        ...formData,
                        firstName: client.firstName,
                        lastName: client.lastName,
                        clientId: client.clientId
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={onEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Client</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="firstName"
                  value={formData.firstName}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="lastName"
                  value={formData.lastName}
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Link to="/createclient">Create a client</Link>
        <div>no Clients</div>
      </>
    );
  }
};

export default Client;
