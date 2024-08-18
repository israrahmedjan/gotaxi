"use client";
import { DestinationCordiContext } from "../../context/DestinationCordiContext";
import { SourceCordiContext } from "../../context/SourceCordiContext";
import { getCoordinate } from "../../helper/ApiHelper";
//import { UserLocationContext } from "../../context/UserLocationContext";
import React, { useEffect, useState, useRef, useContext } from "react";
//const myname = useContext(UserLocationContext);
function AutocompleteAdress() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [sourceFlag, setSourceFlag] = useState(false);
  const [destinationFlag, setDestinationFlag] = useState(false);
  
const {SourceCoordinate, setSourceCoordinate} = useContext(SourceCordiContext);
const {DestCoordinate,setDestCoordinate} = useContext(DestinationCordiContext)

  const sourceInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  //const buttonInputRef = useRef(null);
  const [loadingSource,setloadingSource] = useState(false)
  const [loadingDestination,setloadingDestination] = useState(false)

  const getSourceAddressList = async (location) => {
    try {
      console.log("Location is that",location);
      setloadingSource(true);
      const data = await fetch(`api/search-address?q=` + location, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      setAddressList(res.suggestions || []);
     //  console.log("address list",addressList)
      setloadingSource(false);
      
    
    } catch (err) {
     // console.error("Error fetching address list:", err);
    }
  };

  const getDestAddressList = async (location) => {
    try {
      setloadingDestination(true);
      const data = await fetch(`api/search-address?q=` + location, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      setAddressList(res.suggestions || []);
     
      setloadingDestination(false)
      
    
    } catch (err) {
     // console.error("Error fetching address list:", err);
    }
  };
  const SubmitSourceAddress = async (item)=>
  {
    setSource(item.full_address);
    
    
    const coordinate = await getCoordinate(item);
    setSourceCoordinate(coordinate)
    setSourceFlag(false);
    setAddressList([]);
  
    //setSourceCoordinate(coordinate);
    //sourceInputRef.current.blur(); // Set focus back to the source input
    destinationInputRef.current.focus();
     
  }
  const SubmitDestinationAddress = async (item)=>
    {
      setDestination(item.full_address);
      
      
      const destination = await getCoordinate(item);
      setDestCoordinate(destination);
      setDestinationFlag(false);
      setAddressList([]);
     // destinationInputRef.current.blur(); // Set focus back to the destination input
     //buttonInputRef.current.focus();
    }

  useEffect(() => {
    if (source.length > 2) {
      
     getSourceAddressList(source);
     setSourceFlag(true);
    //console.log("Get Source Use effect is called!",source);
    }
    // if (source.length > 2) {
    //   const delayTimeSource = setTimeout(() => {
    //     getAddressList(source);
    //     setSourceFlag(true);
    //   }, 500);
    //   return () => clearTimeout(delayTimeSource);
    // } else {
    //   setAddressList([]);
    // }
  }, [source]);

  useEffect(() => {
    if (destination.length > 2) {
    getDestAddressList(destination);
    setDestinationFlag(true);
    //destinationInputRef.current.blur();
    }
    //     setDestinationFlag(true);
    // if (destination.length > 2) {
    //   const delayTimeDestination = setTimeout(() => {
    //     getAddressList(destination);
    //     setDestinationFlag(true);
    //   }, 1000);
    //   return () => clearTimeout(delayTimeDestination);
    // } else {
    //   setAddressList([]);
    // }
  }, [destination]);

  return (
    <>
      <div className="flex flex-col py-3 w-auto mx-auto">
        <label className="text-[14px] font-medium text-gray-600">From</label>
        <input
          type="text"
          name="fromAddress"
          value={source}
          className="border-gray-200 border rounded-md px-2 py-1 focus:outline-0"
          onChange={(e) => setSource(e.target.value)}
          ref={sourceInputRef}
          placeholder="Enter starting location"
        />
        {loadingSource && (<div>loading..</div>)}
        {addressList.length > 0 && sourceFlag && (
          <div className="bg-white border border-gray-400 mt-1 rounded shadow-lg relative">
            {addressList.map((item, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-200 cursor-pointer pb-3"
                onClick={()=>SubmitSourceAddress(item)}
              >
                {item.full_address}
              </div>
            ))}
          </div>
        )}

        <label className="text-[14px] font-medium mt-2 text-gray-600">To</label>
        <input
          type="text"
          name="toAddress"
          value={destination}
          className="border-gray-200 border rounded-md px-2 py-1 focus:outline-0"
           onChange={(e) => setDestination(e.target.value)}
          ref={destinationInputRef}
          placeholder="Enter destination"
        />
        {loadingDestination && (<div>loading..</div>)}
        {addressList.length > 0 && destinationFlag && (
          <div className="bg-white border border-gray-400 mt-1 rounded shadow-lg relative">
            {addressList.map((item, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-200 cursor-pointer pb-4"
                onClick={() => {
                 SubmitDestinationAddress(item);
                }}
              >
                {item.full_address}
              </div>
            ))}
          </div>
        )}

        {/* <button className="bg-gray-900 text-white mt-3 w-[150px] float-right">
          Add Booking
        </button> */}
      </div>
    </>
  );
}

export default AutocompleteAdress;
