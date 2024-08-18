import React from 'react'
import Map, { AttributionControl, GeolocateControl , Layer, Marker, NavigationControl,
    Popup, Source } from "react-map-gl";
function MapBoxRoute({coordinates}) {


  return (
    <Source type="geojson" data={{ type: 'Feature', geometry: 
{ type: 'LineString', coordinates: coordinates } }}>
        <Layer
          type="line"
          layout={{ 'line-join': 'round', 'line-cap': 'square' }}
          paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
        />
      </Source>
  )
}

export default MapBoxRoute