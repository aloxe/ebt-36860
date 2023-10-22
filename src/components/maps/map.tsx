'use client'
import { GeoJSON, MapContainer, Pane, TileLayer } from 'react-leaflet';
// import { GeoJSON as GeoJsonTypes } from 'geojson';
import 'leaflet/dist/leaflet.css';
import './map.css';

type MyMapComponent = {
  departements: string[];
  dataCommunes:Feature[];
  showDep: boolean;
  showCom: boolean;
  tiles?: string;
}

// @ts-ignore
type Feature = GeoJsonTypes.Feature
// @ts-ignore
type FeatureCollection = GeoJsonTypes.FeatureCollection

// TILES :
const CartoDB_VoyagerOnlyLabels = {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    pane: 'labels',
    maxZoom: 19
}

const CartoDB_VoyagerNoLabels = {
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

}
// TODO allow tile choice
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

export function MyMapComponent({ departements, dataCommunes, showDep, showCom, tiles }: MyMapComponent) {
  // TODO make an enum for tiles
  const isCarto = tiles === "carto";

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

  // feature is used
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
      {isCarto && <Pane name="labels" style={{ zIndex: 650, pointerEvents: 'none' }}>
      </Pane>}
      {!isCarto && <TileLayer
        attribution={OpenStreetMap_France.attribution} 
        url={OpenStreetMap_France.url}
        maxZoom={OpenStreetMap_France.maxZoom}
      />}
      {isCarto && <TileLayer
        attribution={CartoDB_VoyagerNoLabels.attribution} 
        url={CartoDB_VoyagerNoLabels.url}
        maxZoom={CartoDB_VoyagerNoLabels.maxZoom}
      />}
      {isCarto && <TileLayer
        attribution={CartoDB_VoyagerOnlyLabels.attribution} 
        url={CartoDB_VoyagerOnlyLabels.url}
        maxZoom={CartoDB_VoyagerOnlyLabels.maxZoom}
        pane={"labels"}
      />}

      {/* map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none'; */}
      {showDep && <GeoJSON key="dada" data={deptLayer.data} style={deptLayer.style} />}
      {showCom && dataCommunes?.length > 1 && <GeoJSON key="saints" data={communesLayer.data} style={communesLayer.style} />}
    </MapContainer>
    </>
  )
}