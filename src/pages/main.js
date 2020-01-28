import React, { useEffect , useState} from 'react';
import io from 'socket.io-client';
import { Link} from 'react-router-dom';
import './main.css';

import api from '../services/api';

import logo from '../assets/friendly-v.svg';
import like from '../assets/like.svg';
import dislike  from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }){
    const [users,setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUser(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

           setUsers(response.data);
        }

        loadUser();
    }, [match.params.id]); //quando eu quero executar essa funcaao
    
    useEffect(() => {
        
        async function loadMatch() {
            const socket = io('http://localhost:3333', {
            query: {user: match.params.id}
        });

        await socket.on('match', dev => {
            setMatchDev(dev);
        })  
        }

        loadMatch();

    }, [match.params.id]);
 
    //Like
    async function handleLike(id){
        await api.post(`devs/${id}/likes`, null, {
            headers: {user: match.params.id},
        });

        setUsers(users.filter(user => user._id !== id ));
    }

    //Dislike
    async function handleDislike(id){
        await api.post(`devs/${id}/dislikes`, null, {
            headers: {user: match.params.id},
        });

        setUsers(users.filter(user => user._id !== id ));
    }


    return (
    <div className= "main-container">
        <Link to="/">
            <img src = {logo} alt="Friendly" className= "logo" />
        </Link>

        { users.length > 0 ? (
        <ul>
            {users.map(user => (
            <li key={user._id}>
                <img src = {user.avatar} alt = {user.name} />
                <footer>
                    <strong> {user.name} </strong>
                    <p> {user.bio} </p>
                </footer>

                <div className="buttons">
                    <button type="button" onClick={() => handleDislike(user._id)}>
                        <img src={dislike} alt="Dislike" />
                    </button>
                    <button type="button" onClick={() => handleLike(user._id)}>
                        <img src={like} alt="Like" />
                    </button>
                </div>
            </li>
        ))}   
        </ul>) 
        : 
        (<div className="empty"> ACABOU! :(  </div>
        )}

       {matchDev && (
           <div className="match-container">
               <img src={itsamatch} alt="It's a Match" />
               
               <img className="avatar" src= {matchDev.avatar} alt="Usuario que te quer como amigo!"/>
               <strong>{matchDev.name}</strong>
               <p>{matchDev.bio}</p>

               <button type="button" onClick={() => setMatchDev(null)}  >FECHAR</button>
           </div>
       )}     

    </div>
    )
}