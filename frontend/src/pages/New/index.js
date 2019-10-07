import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './style.css';
import api from '../../services/api';

export default function New({ history }) {
  const [empresa, setEmpresa] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);

  const preview = useMemo(() => {
    return imagem ? URL.createObjectURL(imagem) : null;
  }, [imagem])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('imagem', imagem);
    data.append('tecnologias', tecnologia);
    data.append('preco', preco);
    data.append('empresa', empresa);

    const response = await api.post('/spots', data, {
      headers: { user_id }
    });

    console.log(response);
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="imagem" style={{ backgroundImage: `url(${preview})` }} className={imagem ? 'has-imagem' : ''}>
        <input type="file" onChange={event => setImagem(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="empresa">Empresa *</label>
      <input type="text" id="empresa" placeholder="Sua empresa incrivel" value={empresa} onChange={event => setEmpresa(event.target.value)} />

      <label htmlFor="tecnologia">Tecnologias * <span>(Separadas por vírgulas)</span></label>
      <input type="text" id="tecnologia" placeholder="Quais tecnologias usam?" value={tecnologia} onChange={event => setTecnologia(event.target.value)} />

      <label htmlFor="preco">Valor da Diária * <span>(Em branco para GRATUITO)</span></label>
      <input type="text" id="preco" placeholder="Valor cobrado por dia" value={preco} onChange={event => setPreco(event.target.value)} />

      <button type="submit" className="btn">Cadastrar</button>
    </form >
  )
}
