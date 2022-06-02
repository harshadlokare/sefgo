import React, { useState,useEffect } from "react";
import "./App.css";
import L from "leaflet";
import {MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import leafRed from "./assets/leaf-red.png";
import leafShadow from "./assets/leaf-shadow.png";
import Route from "./frontend/Route";
delete L.Icon.Default.prototype._getIconUrl;

function App(props) {
  const {BaseLayer} = LayersControl;


  const[source,setSource]=useState();
  const[destination,setDestination]=useState();
  const[showMap,setShowMap] = useState(false);
  const[obj,setObj] = useState({});
  const [userData, setUserData] = useState({});
  const [info, setInfo] = useState({});
  const [hotspotCount, setHotspotCount] = useState(0);
  
  const sourceHandler=(e)=>{
    setSource(e);
  }
  
  const destinationHandler=(e)=>{
    setDestination(e);
  }

  const dataUrl = `https://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${source}&wp.1=${destination}&routeAttributes=routePath&key=Apis-OFfeu34KEnthrPkfyCZB90o20UBdmoLWk-awdoVE6VHyJZtP5fnxuQtfsra`;

  const buttonHandler = async () =>{

    var myObject ={};
    let cnt=0;

    const response = await fetch(dataUrl,{
      method:'GET',
      body:JSON.stringify()
    }).catch(error=>console.error(error));

    const jsonData = await response.json();
    const formatData = jsonData.resourceSets[0].resources[0];
    const finalData = formatData.routePath.line.coordinates;
    setInfo(formatData);
    setUserData(finalData);
    for (let i = 1; i < userData.length-2; i++) {
      let angle = findAngle([userData[i][0],userData[i][1]],[userData[i+1][0],userData[i+1][1]],[userData[i+2][0],userData[i+2][1]]);
      let angleInDegree = (angle* 180) / Math.PI;

      if(angleInDegree>70 && angleInDegree<130)
      {     
          myObject[cnt++] = [userData[i+1][0],userData[i+1][1]];
          console.log([userData[i+1][0],userData[i+1][1]],angleInDegree);
      }
    }
    setHotspotCount(cnt);
    console.log(cnt);
    setObj(myObject); 
    setShowMap(true);
  }
    
//.......................................find angle
 const findAngle = (A,B,C) =>{
  var AB = Math.sqrt(Math.pow(B[0]-A[0],2)+ Math.pow(B[1]-A[1],2));    
    var BC = Math.sqrt(Math.pow(B[0]-C[0],2)+ Math.pow(B[1]-C[1],2)); 
    var AC = Math.sqrt(Math.pow(C[0]-A[0],2)+ Math.pow(C[1]-A[1],2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
} 
const convertHMS=(value)=> {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours   = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+' hrs: '+minutes+' min: '+seconds+' sec'; // Return is HH : MM : SS
}
  return (
    <div className="App">
    <h2 className="headline">Drive safe by knowing these accident prone locations...</h2>
      <Route onButtonClick={buttonHandler} onTakeSource={sourceHandler} onTakeDestination={destinationHandler}></Route>
{showMap && <div>
  
    Travel Distance: {info.travelDistance} km
    <br/> 
    Traffic Congestion: {info.trafficCongestion}
    <br/>
    Travel Duration: {convertHMS(info.travelDuration)}
    <br/>
    Total Hotspots: {hotspotCount}
  
</div>}
    <div className="mapDiv">
       {showMap && <MapContainer
            className="map"
            center={[userData[0][0], userData[0][1]]}
            zoom={13}
            scrollWheelZoom={true}
          >            
             <LayersControl>
              <BaseLayer checked name="OpenStreet Map">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </BaseLayer>

            <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              attribution='© NASA Blue Marble, image service by OpenGeo'
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              maxNativeZoom={8}
              />
            </BaseLayer>

            {
              Object.values(obj).map((coordinate, index) => {

                return (
                  <Marker
                    key={index}
                    position={{
                      lat: coordinate[0],
                      lng: coordinate[1],
                    }}
                    icon={L.icon({
                      iconUrl: leafRed,
                      shadowUrl: leafShadow,
                      iconSize: [55, 55], // size of the icon
                      shadowSize: [50, 64], // size of the shadow
                      iconAnchor: [17, 94], // point of the icon which will correspond to marker's location
                      shadowAnchor: [4, 62], // the same for the shadow
                      popupAnchor: [-3, -86],
                    })}
                  />
                );
              })
            }
            
            </LayersControl>
          </MapContainer>}

          </div>
          </div>
          
  )
}

export default App;
