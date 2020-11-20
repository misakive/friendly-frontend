import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/friendly-v.svg'

export default function Register() {
  const [username, setUserName] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const history = useHistory()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleRegister(e) {
    e.preventDefault()
    
    const data = {
      username,
      hobbies,
      latitude,
      longitude,
    }
    
    await api.post('/devs', data)
      .then(()=>history.push(`/`))
      .catch((err)=>{
        alert(`Erro no cadastro, tente novamente. Erro: ${err.response.data.error}`)
    })
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastro </h1>
          <p> Faça seu cadastro, entre na plataforma e faça amigos. </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color=" #00a85a" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder="Usuário no Github" value={username} onChange={e => setUserName(e.target.value)} />
          <textarea type="Hobbies" placeholder="Hobbies" value={hobbies} onChange={e => setHobbies(e.target.value)} />
          <input placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
          <input placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)} />
          
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}