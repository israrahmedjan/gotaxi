import React, { useContext } from 'react'
import { DistanceDurationContext } from '../context/DistanceDurationContext';

const getCoordinate = async (item) => {
  
    console.log("Fetching coordinates for item:", item.mapbox_id);
    
    const BaseUrl = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'
    const url = `${BaseUrl}${item.mapbox_id}?session_token=isrartestt%$12&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data.features || data.features.length === 0) {
        throw new Error("No features found in the response");
      }
  
      const coordinates = data.features[0].geometry.coordinates;
      
  
      return coordinates;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;  // or handle the error accordingly
    }
  };
  
  const getDirectionRoutes = async (SourceCoordinate,DestCoordinate,setDirection) => {
   // const {DistanceDuration,setDistanceDuration} = useContext(DistanceDurationContext)
   
    const BaseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
    const url = `${BaseUrl}${SourceCoordinate[0]},${SourceCoordinate[1]};${DestCoordinate[0]},${DestCoordinate[1]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      
  //console.log(data.routes[0].geometry.coordinates);
    //  console.log("Distance", data);
      const coordinates = data.routes[0].geometry.coordinates;
      setDirection(data);
     
      
    } catch (error) {
   //   console.error("Error fetching coordinates:", error);
      return null;  // or handle the error accordingly
    }
  };

  
  export { getCoordinate,getDirectionRoutes };
  