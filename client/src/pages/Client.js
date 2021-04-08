import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

const Client = () => {
  const [clients , setClients] = useState(null);

  useEffect(()=> {
    const getClients = async() => {
      const {data} = await axios.get('http://localhost:30735/api/Clients');
      setClients(data);
    }
    getClients();
  }, [])

  if(clients) {
    return (<>

    <Link to="/createclient">Create a client</Link>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">client Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
        </tr>
      </thead>
      <tbody>
        {
        clients.map((client) => (
            <tr key={client.clientId}>
              <td>{client.clientId}</td>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
            </tr>
          ))
        }
      </tbody>

    </table>

    </>)
  } else {
    return <>
    <Link to="/createclient">Create a client</Link>
    <div>no Clients</div>
    </>
  }


}

export default Client;
