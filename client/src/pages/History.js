import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const History = () => {
  const [histories, setHistories] = useState();
  useEffect(() => {
    const getHistory = async () => {
      const { data } = await axios.get("http://localhost:30735/api/Histories");
      setHistories(data);
      console.log(data);
    };
    getHistory();
  }, []);
  return (
    <>
      <Link to="/createHistory"> Rent out</Link>
      <table>
        <thead>
          <tr>
            <th scope="col">History Id</th>
            <th scope="col">Unit Id</th>
            <th scope="col">Client Id</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history.historyId}>
              <td>{history.unitId}</td>
              <td>{history.clientId}</td>
              <td>{history.startDate}</td>
              <td>{history.endDate}</td>
              <td>{history.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default History;
