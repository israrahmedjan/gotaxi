import React, { useContext, useState } from 'react'
import CarsList from '../../data/CarsList'
import Image from 'next/image'
import Link from 'next/link'
import { DirectionDataContext } from '../../context/DirectionDataContext'

function Cars({CarSelect}) {
    const {Direction,setDirection} = useContext(DirectionDataContext);
    const [CarIndex,setCarIndex] = useState();
    let DistanceDuration = {
        'distance': Direction?.routes[0].distance,
        'duration':Direction?.routes[0].duration

    }
       
   
  return (
    <>
         <h1  className='text-[14px] font-medium mt-5 text-gray-600 border-b-gray-200 border-b pb-2'>Select Car</h1>
      <div className="flex flex-col py-3 w-auto mx-auto">
      {CarsList && (
        <div className='grid grid-cols-3 gap-1'>
                {CarsList.map((car,i)=>{
                    const totalCost = ((car?.charges || 0) * (DistanceDuration?.distance || 0)).toFixed(2);
                    car = { ...car, TotalCost: totalCost };

                    return (
                      <>
                    
                      <Link key={car.id} href="/" onClick={(e)=>{CarSelect(car);setCarIndex(car.id)}}>
                        <div  className={`${(car.id==CarIndex)?"border-yellow-300 border-[2px] rounded-md":"border-gray-100 border rounded-md "} p-2 hover:border-yellow-400
                 hover:scale-110 transition-all`}>
                          <Image src={car.image} alt={car.name} width={120} height={60} />
                         <div className='flex justify-between text-[12px]'><span>{car.name}</span>
                         <span>${car.charges}</span>
                        </div>
                        {totalCost>0 && ( <div>
                        <span className='text-[12px]'>Total ${totalCost}</span>
                        </div>)}
                       
                        </div></Link>
                       
                      </>
                    )
                })}
        </div>
      )}
       
    </div>
    </>
  )
}

export default Cars
