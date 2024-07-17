// src/components/DataView.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Alert, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './DataView.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataView = () => {
  const [dht11Data, setDht11Data] = useState([]);
  const [bmp180Data, setBmp180Data] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDht11Data = async () => {
      try {
        const response = await api.get('/dht11');
        setDht11Data(response.data);
      } catch (error) {
        setError('Error fetching DHT11 data.');
      }
    };

    const fetchBmp180Data = async () => {
      try {
        const response = await api.get('/bmp180');
        setBmp180Data(response.data);
      } catch (error) {
        setError('Error fetching BMP180 data.');
      }
    };

    fetchDht11Data();
    fetchBmp180Data();
  }, []);

  const getChartData = (data, label) => ({
    labels: data.map(item => item.time),
    datasets: [
      {
        label,
        data: data.map(item => item.temperature),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  return (
    <div className="data-view">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <h2>DHT11 Data</h2>
          <Table striped bordered hover>
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
              {dht11Data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.temperature}</td>
                  <td>{item.humidity}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Line data={getChartData(dht11Data, 'DHT11 Temperature')} />
        </Col>
        <Col md={6}>
          <h2>BMP180 Data</h2>
          <Table striped bordered hover>
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
              {bmp180Data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.pressure}</td>
                  <td>{item.temperature}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Line data={getChartData(bmp180Data, 'BMP180 Temperature')} />
        </Col>
      </Row>
    </div>
  );
};

export default DataView;
