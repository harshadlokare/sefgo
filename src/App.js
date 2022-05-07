import React, { Fragment,Component, useState, useEffect } from "react";
import "./App.css";
import L from "leaflet";
import { Map ,MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import cityData from "./data/dharur-kaij.json";
import leafRed from "./assets/leaf-red.png";
import leafShadow from "./assets/leaf-shadow.png";
import Route from './frontend/route';

delete L.Icon.Default.prototype._getIconUrl;



function App(props) {

    const {BaseLayer} = LayersControl;
  const [location, setLocation] = useState(cityData.features[0].geometry);

  /* useEffect(() => {
    const pGeojson = new L.GeoJSON(cityData);
    pGeojson.addTo(MapContainer);
  }, []); */
  return (
    <Fragment>
      <h2 class="headline">Drive safe by knowing these accident prone locations...</h2>
    <div className="App">
    <Route></Route>
    <MapContainer
            className="map"
            center={[location.coordinates[0][1], location.coordinates[0][0]]}
            zoom={13}
            scrollWheelZoom={true}
          >
            {/* <GeoJSON data={cityData}></GeoJSON> */}
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
          </MapContainer>
          </div>
          </Fragment>
  )
}

export default App;
