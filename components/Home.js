'use client'
import React, { useEffect, useState } from 'react'


import { UserLocationContext } from '../context/UserLocationContext';
import AutocompleteAdress from './Map/AutocompleteAddress';
import MapBoxMap from './Map/MapBoxMap';
import { SourceCordiContext } from '../context/SourceCordiContext';
import { DestinationCordiContext } from '../context/DestinationCordiContext';
import {DirectionDataContext} from '../context/DirectionDataContext';

import Booking from './Booking/Booking'



function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [SourceCoordinate, setSourceCoordinate] = useState();
  const [DestCoordinate, setDestCoordinate] = useState();
  const [Direction,setDirection] = useState();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    }, (error) => {
      //console.error('Error getting location:', error);
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);


  return (
      
     
<>
<DirectionDataContext.Provider value={{Direction,setDirection}}>
<DestinationCordiContext.Provider value={{DestCoordinate,setDestCoordinate}}>
<SourceCordiContext.Provider value={{SourceCoordinate, setSourceCoordinate}}>
 <UserLocationContext.Provider value={userLocation}>
      <div className="grid md:grid-cols-3 gap-3 px-10 mt-2">
      
        <div className="border-gray-200 border rounded-md md:col-span-1 p-5">
          <div>
            {/* Ensure proper rendering */}
            <div>
           
            {/* <TestDemo /> */}
            <Booking />

          </div>
        </div>
        </div>
        <div className="border-gray-200 border rounded-md md:col-span-2 p-5">
          <MapBoxMap />
        </div>
       
      </div> 
      </UserLocationContext.Provider>
      </SourceCordiContext.Provider>
      </DestinationCordiContext.Provider>
      </DirectionDataContext.Provider>
      
    </>


    
    
  )
}

export default Home
