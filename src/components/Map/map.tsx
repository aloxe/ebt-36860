'use client'
import { TileLayer, MapContainer, GeoJSON } from 'react-leaflet'
import { useEffect, useState, useCallback } from 'react';
import { removeDuplicateRegions } from '@/helpers/cityutils';
// import { GeoJSON as GeoJsonTypes } from 'geojson';
import 'leaflet/dist/leaflet.css';
import './map.css';

type MyMapComponent = {
  departements: any;
  showDep: boolean;
  showCom: boolean;
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

const regionsDept = require('@/data/departments_regions_france_2017.json')
// @ts-ignore
const regionCodes:string[] = removeDuplicateRegions(regionsDept).map(item => item.regionCode);


const fetchData = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

export function MyMapComponent({ departements, showDep, showCom }: MyMapComponent) {
  const [ dataCommunes, setDataCommunes ] = useState<Feature[]>([]);

  const handlefetchData = useCallback( async () => {
    let communesToDisplay = new Array();
    let regionToDisplay = [];
    regionCodes.map( async (regionCode) => {
      // TODO make this fetch quicker or send it to GeoJson before
      const regionCommunes = await fetchData(regionCode);
      const regionSaintCommunes = await regionCommunes.features.filter((asset:Feature) => asset.properties.nom.includes("Saint"));
      communesToDisplay = communesToDisplay.concat(regionSaintCommunes)
      regionToDisplay.push(regionCode)
      if (regionToDisplay.length == regionCodes.length) {
        console.log(communesToDisplay);
        
        setDataCommunes(communesToDisplay);
      }
    });
  }, [])

  useEffect(() => {
    if (dataCommunes.length < 1) {
      handlefetchData()
    }
  }, [dataCommunes, handlefetchData])

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