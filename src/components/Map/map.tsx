'use client'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
// import { GeoJSON as GeoJsonTypes } from 'geojson';
import 'leaflet/dist/leaflet.css';
import './map.css';

type MyMapComponent = {
  departements: string[];
  showDep: boolean;
  showCom: boolean;
  dataCommunes:Feature[];
}

// @ts-ignore
type Feature = GeoJsonTypes.Feature
// @ts-ignore
type FeatureCollection = GeoJsonTypes.FeatureCollection

// TILES :
const OSM = { 
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

const OpenStreetMap_France = { 
  url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  maxZoom: 20,
  attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

export function MyMapComponent({ departements, dataCommunes, showDep, showCom }: MyMapComponent) {

  const deptLayer : {data:FeatureCollection, style?:any} = {
    data: require("@/data/departements.geojson"),
  }

  deptLayer.style = (feature: Feature) => {
    return {
      fillColor: departements?.includes(feature.properties.code) ? 'pink' : 'transparent', 
      dashArray: "3",
      fillOpacity: 0.4,
      color: 'black', 
      weight: 1,
      opacity: 1
    };
  };

  const communesLayer : {data:FeatureCollection, style?:any} = {
    data: dataCommunes
  }

  communesLayer.style = (feature: Feature) => {
    return {
      fillColor: 'indigo', 
      dashArray: "3",
      fillOpacity: 0.6,
      color: 'indigo', 
      weight: 1,
      opacity: 1
    };
  };

  return (
    <>
    <MapContainer
      center={[46.449, 2.867]}
      zoom={6}
      scrollWheelZoom={false}
      placeholder={<p>carte de France</p>}>
      <TileLayer
        attribution={OpenStreetMap_France.attribution} 
        url={OpenStreetMap_France.url}
        maxZoom={OpenStreetMap_France.maxZoom}
      />
      {showDep && <GeoJSON key="dada" data={deptLayer.data} style={deptLayer.style} />}
      {showCom && dataCommunes.length > 1 && <GeoJSON key="saints" data={communesLayer.data} style={communesLayer.style} />}
    </MapContainer>
    </>
  )
}