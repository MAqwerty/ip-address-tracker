import React from "react";
import "./Home.css"
import arrowSVG from "./../assets/images/icon-arrow.svg"
import { useState , useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import locationSVG from "./../assets/images/icon-location.svg"
import L from "leaflet"

const Home = () => {
  const axios = require('axios').default;

  const [ipAddress,setipAddress]= useState("");

  const [ipAddressGET,setipAddressGET]= useState("");
  const [countryGET,setcountryGET]= useState("");
  const [regionGET,setregionGET]= useState("");
  const [cityGET,setcityGET]= useState("");
  const [TimezoneGET,setTimezoneGET]= useState("");
  const [ISP,setISP]= useState("");
  const [lat,setlat]= useState("");
  const [lng,setlng]= useState("");

  const position = [lat,lng]

  const [loading,setloading]= useState(true);


  let DefaultIcon = L.icon({
    iconUrl: locationSVG,
    iconSize: [45, 56],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  function LocationMarker() {
    const map = useMapEvents({});
    map.flyTo(position, map.getZoom());
    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  }

  // .............................update information............................//
  const GETdata = async () => {
    setloading(true)

    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RswWxBV7vPXfaOdZPKN8thQap3l5w&ipAddress=${ipAddress}`);
    console.log(response)
    setipAddressGET(response.data.ip,setloading(false)) 
    setcountryGET(response.data.location.country,setloading(false))
    setregionGET(response.data.location.region,setloading(false))
    setcityGET(response.data.location.city,setloading(false))
    setTimezoneGET(response.data.location.timezone,setloading(false))
    setISP(response.data.isp,setloading(false))
  
    setlat(response.data.location.lat,setloading(false))
    setlng(response.data.location.lng,setloading(false))
  }
  

  // ...........................Set default information........................//
    useEffect(() => {
      window.onload = async () => {
        const hello = await axios.get("https://geo.ipify.org/api/v2/country,city?apiKey=at_RswWxBV7vPXfaOdZPKN8thQap3l5w&ipAddress");

        setloading(true)

        console.log(hello)
        setipAddressGET(hello.data.ip,setloading(false)) 
        setcountryGET(hello.data.location.country,setloading(false))
        setregionGET(hello.data.location.region,setloading(false))
        setcityGET(hello.data.location.city,setloading(false))
        setTimezoneGET(hello.data.location.timezone,setloading(false))
        setISP(hello.data.isp,setloading(false))

        setlat(hello.data.location.lat,setloading(false))
        setlng(hello.data.location.lng,setloading(false))
      }

    // ................................Regex for input ip............................//
      function validateipAddress (ip){

        let regexip = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
        let inputAddress = document.getElementById("input-Address")

        if (ip.match(regexip)) {
          document.getElementById("button-Address").classList.remove('button-Address-disabled')
          inputAddress.classList.remove('NOTavailable')
          inputAddress.placeholder="Search for any IP address or domain"
        } 
        else {
          inputAddress.classList.add('NOTavailable')
          inputAddress.placeholder="IP not available"
          document.getElementById("button-Address").classList.add('button-Address-disabled')
          setloading(true)
        }
      }
      function TESTip (IPAdress){
        IPAdress=ipAddress
        validateipAddress(IPAdress)
      }
      document.getElementById("button-Address").addEventListener("click",TESTip);
  });

  return (
    <>
      <header className="header-Home"> 
        <h1 className="h1-header" >IP Address Tracker</h1>
        
        <form className="form-Home">
          <input className="form-input-Address" type="text" name="" id="input-Address" value={ipAddress} onChange={(e) => setipAddress(e.target.value)} placeholder="Search for any IP address or domain" />
          <button className="form-button-Address" onClick={GETdata} id="button-Address" type="button"><img src={arrowSVG} alt="" /></button>
        </form>

        <article className="article-Home">
          <div className="article-div-1 divCLASS"><p>IP Address</p>{loading ? (<div className="ISloading"></div>) : (<h2>{ipAddressGET}</h2>)}</div>
          <div className="article-div-2 divCLASS"><p>Location</p>{loading ? (<div className="ISloading"></div>) : (<h2>{countryGET} {regionGET} {cityGET}</h2>)}</div>
          <div className="article-div-3 divCLASS"><p>Timezone</p>{loading ? (<div className="ISloading"></div>) : (<h2>UTS{TimezoneGET}</h2>)}</div>
          <div className="article-div-4 divCLASS"><p>ISP</p>{loading ? (<div className="ISloading"></div>) : (<h2>{ISP}</h2>) }</div>
        </article>
      </header>

       <main className="main-Home">
         <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
            <p>✔️ Your server is here ¯\_(ツ)_/¯ </p>             
           </Popup>
          </Marker>
          <LocationMarker position={position} />
        </MapContainer>
       </main>
    </>
  )
};

export default Home;
