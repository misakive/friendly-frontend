import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/friendly-v.svg'
import heroesImg from '../../assets/friends.png'

export default function Login() {
	const history = useHistory()
	const [username, setUsername] = useState('');

	async function handleSubmit(e){
		e.preventDefault();
		try {
			
			const response = await api.post('/sessions', {
					username,
			});

			localStorage.setItem('@Friend/data', JSON.stringify(response.data));
			
			console.log(response.data);
			const {_id} = response.data;

			history.push(`/dev/${_id}`);
		} catch (err) {
			alert('Falha no login, tente novamente.')
		}
	}
	
return (
	<div className="login-container">
		<section className="form">
			<img src={logoImg} alt="Be a Friend" />

			<form onSubmit={handleSubmit}>

				<h1> Faça seu Login </h1>

				<input 
					placeholder="Digite seu usuario no Github"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>

				<button className="button" type="submit"> Entrar </button>

				<Link className="back-link" to="/register">
					<FiLogIn size={16} color="#00a85a" />
					Não tenho cadastro
				</Link>
				
			</form>
		</section>
		<img src={heroesImg} alt="Friends" />
	</div>
)}

// import React, {useState} from 'react';
// import './styles.css';
// import api from '../../services/api'
// import logo from '../../assets/friendly-v.svg';

// export default function Login({history}) {
//     const [username, setUsername] = useState('');

//     async function handleSubmit(e){
//         e.preventDefault();

//         const response = await api.post('/devs', {
//             username,
//         });

//         console.log(response);
//         const {_id} = response.data;
 
//         history.push(`/dev/${_id}`);
//     }

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit}>
//                 <img src={logo} alt="Friendly" />
//                 <input 
//                     placeholder="Digite seu usuario no Github"
//                     value={username}
//                     onChange={e => setUsername(e.target.value)}
//                 />
//                 <button type="submit">Entrar</button>
//             </form>
//         </div>
//     );
// }