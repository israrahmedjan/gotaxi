'use client'
import React from 'react'
import Image from 'next/image';


function page() {
    let SeletedCar = JSON.parse(localStorage.getItem('SelectedCar'));
  let amount = (SeletedCar.TotalCost>0)?parseInt(SeletedCar.TotalCost):100;
  return (
    <div>
      <div className='m-550 mt-6 border-gray-200 m-auto p-5'>
        {/* <h1 className='tex-[30px] uppercase'> Transection done successfully!</h1> */}
        <div>
        {SeletedCar && SeletedCar.TotalCost>0 && (
 <div className='flex flex-col items-center font-semibold'>
 <h1 className='mt-5 text-[25px]'>Transection done successfully!</h1>
   <Image src={SeletedCar.image} alt={SeletedCar.name} width={300} height={250} />
   <div>Car Name : <span className='font-normal'>{SeletedCar.name} </span></div>
   <div>Charges Per Miles : <span className='font-normal'>${SeletedCar.charges} </span></div>
   <div>Total Cost : <span className='font-normal'>${SeletedCar.TotalCost} </span></div>
 </div>

    ) }
   
        </div>
      </div>
    </div>
  )
}

export default page
