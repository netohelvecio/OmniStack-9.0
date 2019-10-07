import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Dashboard() {
  const [spot, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/profile', {
        headers: { user_id }
      });

      console.log(response.data);
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spot.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.imagem_url})` }}></header>
            <strong>{spot.empresa}</strong>
            <span>{spot.preco ? `R$${spot.preco}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}
