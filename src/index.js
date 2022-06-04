import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import markerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
L.Marker.prototype.setIcon(L.icon({
  iconUrl:markerIcon
}))
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
