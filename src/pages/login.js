import React, {useState} from 'react';
import './login.css';
import api from '../services/api'
import logo from '../assets/friendly-v.svg';

export default function Login({history}) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        });

        console.log(response);
        const {_id} = response.data;
 
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Friendly" />
                <input 
                    placeholder="Digite seu usuario no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}