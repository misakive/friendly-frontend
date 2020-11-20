import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import './styles.css';
import { useHistory } from 'react-router-dom';

const Marker = ({ text, dev }) => {
  return (
    <div>
      <img src={dev.avatar} alt="Avatar" className="avatar" />
      
      {/* <div className="callout">
        <p style={{fontWeight: "bold"}}>{dev.name}</p>
        <p style={{color: '#666', marginTop: 5}}>{dev.bio}</p>
        <p style={{marginTop: 5}}>{dev.hobbies}</p>
      </div> */}
    </div>
  )
};

function MapFriends() {
	const [dev] = useState(JSON.parse(localStorage.getItem('@Friend/data')) || null);
  const [center] = useState({ lat: dev.latitude, lng: dev.longitude })
  const history = useHistory();
  const devs = history.location.state;
  const zoom = 15;

  return (
    <div className= "main-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        center={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        
      >
        {devs && devs.map(dev=> (
          <Marker
            key={dev._id}
            lat={dev.latitude}
            lng={dev.longitude}
            text="Meu Marcador"
            dev={dev}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default MapFriends;

// const [devs, setDevs] = useState([]);
//   const [currentRegion, setCurrentRegion] = useState(null);
//   const [techs, setTechs] = useState('');

//   useEffect(() => {
//     async function loadInitialPosition() {
//       const { granted } = await requestPermissionsAsync();

//       if (granted) {
//         const { coords } = await getCurrentPositionAsync({
//           enableHighAccuracy: true,
//         });

//         const { latitude, longitude } = coords;

//         setCurrentRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.04,
//           longitudeDelta: 0.04,
//         })
//       }
//     }

//     loadInitialPosition();
//   }, []);

//   useEffect(() => {
//     subscribeToNewDevs(dev => setDevs([...devs, dev]));
//   }, [devs]);

//   function setupWebsocket() {
//     disconnect();

//     const { latitude, longitude } = currentRegion;

//     connect(
//       latitude,
//       longitude,
//       techs,
//     );
//   }

//   async function loadDevs() {
//     const { latitude, longitude } = currentRegion;

//     const response = await api.get('/search', {
//       params: {
//         latitude,
//         longitude,
//         techs
//       }
//     });
    
//     setDevs(response.data.devs);
//     setupWebsocket();
//   }

//   function handleRegionChanged(region) {
//     setCurrentRegion(region);
//   }

//   if (!currentRegion) {
//     return null;
//   }



// const [dev] = useState(JSON.parse(localStorage.getItem('@Friend/data')) || null);
//   const [latitude, setLatitude] = useState("")
//   const [longitude, setLongitude] = useState("")
//   const [center, setCenter] = useState({lat: "", lng: ""})
  
//   const zoom = 20;

//   useEffect(()=>{
//     if (dev) {
//       setLatitude(dev.latitude);
//       setLongitude(dev.longitude);
//       setCenter({ lat: dev.latitude, lng: dev.longitude })
//     }

//   },[dev])