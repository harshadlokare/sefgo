import React, { useState } from "react";
import "./App.css";
import L from "leaflet";
import {MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import DharurKaijData from "./data/dharur-kaij.json";
import SangliMirajData from "./data/sangli-miraj.json";
import SangliPuneData from "./data/sangli-pune.json";

import leafRed from "./assets/leaf-red.png";
import leafShadow from "./assets/leaf-shadow.png";
import Route from "./frontend/Route";
//import Routing from "./code/Routing";
delete L.Icon.Default.prototype._getIconUrl;

function App(props) {

  const {BaseLayer} = LayersControl;

  //get data from json file
  const [DKloc, setDKloc] = useState(DharurKaijData.DK[0].geometry);
  const [SMloc, setSMloc] = useState(SangliMirajData.SM[0].geometry);
  const [SPloc, setSPloc] = useState(SangliPuneData.SP[0].geometry);


//set user input in string format
  const[source,setSource]=useState("");
  const[destination,setDestination]=useState("");

  //show map corresponding to inputs
  const[showDKMap,setShowDKMap] = useState(false);
  const[showSMMap,setShowSMMap] = useState(false);
  const[showSPMap,setShowSPMap] = useState(false);

//function to handler map related to inputs
  function buttonHandler(){
    if((source=="sangli" || source=="Sangli") && (destination=="Miraj" || destination=="miraj")){
      setShowSMMap(true);
    }
    if((source=="Dharur" || source=="dharur") && (destination=="kaij"|| destination=="Kaij")){
      setShowDKMap(true);
    }

    if((source=="Sangli" || source=="sangli") && (destination=="Pune" || destination=="pune")){
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
         {/* Dharur - Kaij Map with coordinates */}

      {showDKMap && <MapContainer
            className="map"
            center={[DKloc.coordinates[0][1], DKloc.coordinates[0][0]]}
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
              DKloc.coordinates.map((coordinate, index) => {
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

   {/* Sangli - Miraj Map with coordinates */}
          {showSMMap && <MapContainer
            className="map"
            center={[SMloc.coordinates[0][1], SMloc.coordinates[0][0]]}
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
              SMloc.coordinates.map((coordinate, index) => {
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

   {/* Sangli - Pune Map with coordinates */}
            {showSPMap && <MapContainer
            className="map"
            center={[SPloc.coordinates[0][1], SPloc.coordinates[8][0]]}
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
              SPloc.coordinates.map((coordinate, index) => {
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
