'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AutocompleteAddress from "../Map/AutocompleteAddress"
import Cars from "./Cars"
import Cards from "./Cards"
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SourceCordiContext } from '../../context/SourceCordiContext'
import { DestinationCordiContext } from '../../context/DestinationCordiContext'



function Booking() {
  const [SelectedCar,setSelectedCar] = useState();
  const router = useRouter();
  const {SourceCoordinate, setSourceCoordinate} = useContext(SourceCordiContext);
const {DestCoordinate,setDestCoordinate} = useContext(DestinationCordiContext)
const buttRef = useRef();

// useEffect(()=>
//   {
//     console.log("Source Coordinate is work!");
   
//     if(SourceCoordinate && DestCoordinate){ 
//       if (buttRef.current) {
//         buttRef.current.disabled = false; 
//         buttRef.current.style.backgroundColor = 'yellow';
//       }
    
//     }
     
    
//   },[SelectedCar])
  
  const SelectedCarFun = (car)=>
    {
       
       // console.log("Select Car", car);
        setSelectedCar(car)
    }

    const BookNow=()=>
    {
//console.log("Log file called!",SelectedCar?.id);
    
    

    if(!SourceCoordinate || !DestCoordinate || !parseInt(SelectedCar?.id)){
         toast.error("Kindly select your source and destination routes first, then choose your preferred car!", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastClassName: "custom-toast",
    progressClassName: "custom-progress",
    });
    }
   
    if(SourceCoordinate && DestCoordinate && parseInt(SelectedCar?.id)){
    //   console.log('local storage set')
    localStorage.setItem('SelectedCar', JSON.stringify(SelectedCar));
    router.push(`/checkout`);
    }
  //  
    //router.push('/checkout');
      
    }
  return (
    <div>
    <h1 className='text-[20px] font-semibold'>Booking</h1>
    <AutocompleteAddress />
   
    <Cars CarSelect={SelectedCarFun} />
    <Cards />
    <button ref={buttRef} className='w-full
        p-1 bg-[#fea904] text-black border-yellow-300 border rounded-md
        mt-4 font-semibold' onClick={(e)=>{BookNow()}}>Book Now</button>
        <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Booking
