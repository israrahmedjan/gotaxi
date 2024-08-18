import React, { useContext } from 'react'
import { SourceCordiContext } from '../../context/SourceCordiContext';
import { DestinationCordiContext } from '../../context/DestinationCordiContext';
import { Marker } from 'react-map-gl';


function Markers() {
    const {SourceCoordinate, setSourceCoordinate} = useContext(SourceCordiContext);
    const {DestCoordinate,setDestCoordinate} = useContext(DestinationCordiContext);
  return (
    <>
     
      {SourceCoordinate && ( <Marker  
                longitude={SourceCoordinate[0]}
                latitude={SourceCoordinate[1]}
                anchor="bottom" >
                 <img src="./pin.png" 
                 className='w-10 h-10'
                 />
                </Marker>)}
               

   {DestCoordinate && (
    <Marker  
    longitude={DestCoordinate[0]}
    latitude={DestCoordinate[1]}
    anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
</Marker>
   )}            
    </>
  )
}

export default Markers
