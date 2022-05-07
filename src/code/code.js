import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import cityData from "../data/dharur-kaij.json";
import leafRed from "../assets/leaf-red.png";
import leafShadow from "../assets/leaf-shadow.png";
import "./code.css";

const Code = (props)=> {

  const [location, setLocation] = useState(cityData.features[0].geometry);

  return (
    <MapContainer
            className="map"
            center={[location.coordinates[0][1], location.coordinates[0][0]]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
                      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                      shadowAnchor: [4, 62], // the same for the shadow
                      popupAnchor: [-3, -86],
                    })}
                  />
                );
              })
            }
          </MapContainer>
  )
}

export default Code;
