// src/components/DashboardView.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Row, Col, Card } from 'react-bootstrap';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './DashboardView.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardView = () => {
  const [dht11Data, setDht11Data] = useState([]);
  const [bmp180Data, setBmp180Data] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDht11Data = async () => {
      try {
        const response = await api.get('/dht11');
        setDht11Data(response.data);
      } catch (error) {
        setError('Error al obtener datos de DHT11.');
      }
    };

    const fetchBmp180Data = async () => {
      try {
        const response = await api.get('/bmp180');
        setBmp180Data(response.data);
      } catch (error) {
        setError('Error al obtener datos de BMP180.');
      }
    };

    fetchDht11Data();
    fetchBmp180Data();
  }, []);

  const getChartData = (data, label, type) => ({
    labels: data.map(item => item.time),
    datasets: [
      {
        label,
        data: data.map(item => item[type]),
        fill: type === 'temperature', // Sólo llenar el área para gráficos de temperatura
        backgroundColor: type === 'temperature' ? 'rgba(75,192,192,0.2)' : 'rgba(153,102,255,0.2)',
        borderColor: type === 'temperature' ? 'rgba(75,192,192,1)' : 'rgba(153,102,255,1)',
      },
    ],
  });

  return (
    <div className="dashboard-view">
      {error && <p className="error">{error}</p>}
      <Row>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Temperatura DHT11</Card.Title>
              <Line data={getChartData(dht11Data, 'Temperatura DHT11', 'temperature')} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Temperatura BMP180</Card.Title>
              <Line data={getChartData(bmp180Data, 'Temperatura BMP180', 'temperature')} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Humedad DHT11</Card.Title>
              <Bar data={getChartData(dht11Data, 'Humedad DHT11', 'humidity')} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Presión BMP180</Card.Title>
              <Bar data={getChartData(bmp180Data, 'Presión BMP180', 'pressure')} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Gráfico Combinado Radar</Card.Title>
              <Radar data={{
                labels: dht11Data.map(item => item.time),
                datasets: [
                  {
                    label: 'Temperatura DHT11',
                    data: dht11Data.map(item => item.temperature),
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                  },
                  {
                    label: 'Temperatura BMP180',
                    data: bmp180Data.map(item => item.temperature),
                    backgroundColor: 'rgba(153,102,255,0.2)',
                    borderColor: 'rgba(153,102,255,1)',
                  },
                ]
              }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Gráfico de Donuts (Temperaturas Promedio)</Card.Title>
              <Doughnut data={{
                labels: ['Temperatura Promedio DHT11', 'Temperatura Promedio BMP180'],
                datasets: [
                  {
                    label: 'Temperaturas Promedio',
                    data: [
                      dht11Data.reduce((acc, item) => acc + item.temperature, 0) / dht11Data.length,
                      bmp180Data.reduce((acc, item) => acc + item.temperature, 0) / bmp180Data.length,
                    ],
                    backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)'],
                    borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)'],
                  },
                ]
              }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardView;
