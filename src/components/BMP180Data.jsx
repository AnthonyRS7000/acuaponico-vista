// src/components/BMP180Data.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BMP180Data = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/bmp180');
        setData(response.data);
      } catch (error) {
        setError('Error fetching BMP180 data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>BMP180 Data</h2>
      {error && <p>{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pressure</th>
            <th>Temperature</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.pressure}</td>
              <td>{item.temperature}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BMP180Data;
