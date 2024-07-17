// src/components/DHT11Data.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DHT11Data = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dht11');
        setData(response.data);
      } catch (error) {
        setError('Error fetching DHT11 data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>DHT11 Data</h2>
      {error && <p>{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DHT11Data;
