'use client'
import { UserLocationContext } from '../../context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers"
import MapBoxRoute from "./MapBoxRoute";
import { SourceCordiContext } from '../../context/SourceCordiContext';
import { DestinationCordiContext } from '../../context/DestinationCordiContext';
import { DirectionDataContext } from '../../context/DirectionDataContext';
import { getDirectionRoutes } from '../../helper/ApiHelper';
import DistanceTime from '../../components/Map/DistanceTime'


function MapBoxMap() {
    const UserLocation = useContext(UserLocationContext);
    const mapContainer = useRef();

    const {SourceCoordinate, setSourceCoordinate} = useContext(SourceCordiContext);
    const {DestCoordinate,setDestCoordinate} = useContext(DestinationCordiContext);
  const {Direction,setDirection} = useContext(DirectionDataContext);
  let FilterDirection = Direction?.routes[0].geometry.coordinates;
    useEffect(() => {
      if (SourceCoordinate) {
        mapContainer.current?.flyTo({
          center: [SourceCoordinate[0], SourceCoordinate[1]],
          duration: 2500,
        });
      }
      
     // console.log("Use effect is called Source!");
    }, [SourceCoordinate]);

    useEffect(() => {
      if (DestCoordinate) {
        mapContainer.current?.flyTo({
          center: [DestCoordinate[0], DestCoordinate[1]],
          duration: 2500,
        });
      }
      if(SourceCoordinate && DestCoordinate)
      {
        getDirectionRoutes(SourceCoordinate,DestCoordinate,setDirection);
      }
     
      //console.log("Use effect is called Des!");
    }, [DestCoordinate]);
    
    return (
        <>
        <div>
          <h1 className='text-[20px] font-semibold mb-3'>Map</h1>
          <DistanceTime className="z-10" />
      {/* <div>Source Coordinates 1111{JSON.stringify(SourceCoordinate,null,2) }{}</div>
        <div>Destination Coordinates 1111{JSON.stringify(DestCoordinate,null,2)} </div>
        <div>Source Coordinates 1111{JSON.stringify(SourceCoordinate,null,2) }{}</div> */}
        {/* <div>Distance and durnation{JSON.stringify(DistanceDuration,null,2) }{}</div>
         */}
        {/* <div>Direction Data : {JSON.stringify(Direction,null,2)} </div> */}

      </div>
        <Map ref={mapContainer}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -122.41560474707809,
        latitude: 37.76754226127442,
            zoom: 14
          }}
          style={{width: '100%', height: 500}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
         
         <Marker  
    longitude="-122.41560474707809"
    latitude="37.76754226127442"
    anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
</Marker>

<Markers />



<MapBoxRoute coordinates ={FilterDirection} />

        
          </Map>
        
          
        </>
        )
}

export default MapBoxMap
