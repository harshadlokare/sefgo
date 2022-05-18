import React, { useState } from "react";
import "./App.css";
import L from "leaflet";
import {MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import DharurKaijData from "./data/dharur-kaij.json";
import SangliMirajData from "./data/sangli-miraj.json";
import SangliPuneData from "./data/sangli-pune.json";

import leafRed from "./assets/leaf-red.png";
import leafShadow from "./assets/leaf-shadow.png";
import Route from "./frontend/route";

delete L.Icon.Default.prototype._getIconUrl;

function App(props) {

  const {BaseLayer} = LayersControl;
  const [location, setLocation] = useState(DharurKaijData.DK[0].geometry);
  const [location1, setLocation1] = useState(SangliMirajData.SM[0].geometry);
  const [location2, setLocation2] = useState(SangliPuneData.SP[0].geometry);



  const[source,setSource]=useState("");
  const[destination,setDestination]=useState("");

  const[showDKMap,setShowDKMap] = useState(false);
  const[showSMMap,setShowSMMap] = useState(false);
  const[showSPMap,setShowSPMap] = useState(false);

  function buttonHandler(){
    if(source=="sangli" && destination=="miraj"){
      console.log("Its matched Sangli-Miraj ROute!!!!!!!!!!!!!!");
      setShowSMMap(true);
    }
    if(source=="dharur" && destination=="kaij"){
      console.log("Its matched Dharur-Kaij ROute!!!!!!!!!!!!!!");
      setShowDKMap(true);
    }

    if(source=="sangli" && destination=="pune"){
      console.log("Its matched Sangli-Pune ROute!!!!!!!!!!!!!!");
      setShowSPMap(true);
    }
  }

  const sourceHandler=(e)=>{
    setSource(e);
  }
  
  const destinationHandler=(e)=>{
    setDestination(e);
  }

  
  
  

  return (
    
      
    <div className="App">
    <h2 class="headline">Drive safe by knowing these accident prone locations...</h2>
      <Route onButtonClick={buttonHandler} onTakeSource={sourceHandler} onTakeDestination={destinationHandler}></Route>

    <div class="mapDiv">
      {showDKMap && <MapContainer
            className="map"
            center={[location.coordinates[0][1], location.coordinates[0][0]]}
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
              location.coordinates.map((coordinate, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: coordinate[1],
                      lng: coordinate[0],
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



          

          {showSMMap && <MapContainer
            className="map"
            center={[location1.coordinates[0][1], location1.coordinates[0][0]]}
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
              location1.coordinates.map((coordinate, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: coordinate[1],
                      lng: coordinate[0],
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

            {showSPMap && <MapContainer
            className="map"
            center={[location2.coordinates[0][1], location2.coordinates[8][0]]}
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
              location2.coordinates.map((coordinate, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: coordinate[1],
                      lng: coordinate[0],
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
