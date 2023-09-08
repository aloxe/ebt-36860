'use client'
import { useMap, TileLayer, MapContainer, GeoJSON, FeatureGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './map.css';
import { useEffect, useState, useCallback } from 'react';
import { removeDuplicateRegions } from '@/helpers/cityutils';

// TILES :
const OSM ={ 
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

const OpenStreetMap_France ={ 
  url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  maxZoom: 20,
  attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

const regionsDept = require('@/data/departments_regions_france_2017.json')
const regionsDeptFiltered = removeDuplicateRegions(regionsDept);
const regionCodes:string[] = removeDuplicateRegions(regionsDept).map(item => item.regionCode);


const fetchData = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}



export function MyMapComponent(props) {
  const { departements } = props;
  const [ dataCommunes, setDataCommunes ] = useState([]);

  const handlefetchData = useCallback( async () => {
    let communesToDisplay: any[] = Array();
    let regionToDisplay = [];
    regionCodes.map( async (regionCode) => {
      // TODO make this fetch quicker or send it to GeoJson before
      const regionCommunes = await fetchData(regionCode);
      const regionSaintCommunes = await regionCommunes.features.filter((asset) => asset.properties.nom.includes("Saint"));
      communesToDisplay = communesToDisplay.concat(regionSaintCommunes)
      regionToDisplay.push(regionCode)
      if (regionToDisplay.length == regionCodes.length) {
        setDataCommunes(communesToDisplay);
      }
    });
  }, [])

  useEffect(() => {
    if (dataCommunes.length < 1) {
      console.log("=== === === ===");
      handlefetchData()
    }
  }, [dataCommunes, handlefetchData])

  const geoDataDepartements = require("@/data/departements.geojson");

    const style = feature => {
    return {
      fillColor: departements?.includes(feature.properties.code) ? 'pink' : 'transparent', 
      dashArray: "3",
      fillOpacity: 0.5,
      color: 'black', 
      weight: 1,
      opacity: 1
    };
  };

  return (
    <MapContainer 
      center={[46.449, 2.867]}
      zoom={6}
      scrollWheelZoom={false}
      placeholder={<p>carte machin</p>}>
      <TileLayer
        attribution={OpenStreetMap_France.attribution} 
        url={OpenStreetMap_France.url}
        maxZoom={OpenStreetMap_France.maxZoom}
      />
      {/* { GeoData() } */}
      <GeoJSON key="dada" data={geoDataDepartements} style={style} />
      {dataCommunes.length > 1 && <GeoJSON key="saints" data={dataCommunes} />}
      {/* {dataCommunes &&
        regionCodes.map((regionCode) => {
          console.log(regionCode);
          
          return (<GeoJSON key={regionCode} data={dataCommunes[regionCode]} />)
        })
      } */}
    </MapContainer>
  )
}