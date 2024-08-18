'use client'
import React, { useState } from 'react'

import CheckoutForm from '../../components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
function page() {
  let SeletedCar = JSON.parse(localStorage.getItem('SelectedCar'));
  let amount = (SeletedCar.TotalCost>0)?parseInt(SeletedCar.TotalCost):100;
  
  return (
    <>
     <div className='w-[550px] m-auto border-gray-200 border mt-6'>
   
    {SeletedCar && SeletedCar.TotalCost>0 && (
 <div className='flex flex-col items-center font-semibold'>
 <h1 className='mt-5 text-[25px]'>CheckOut Form</h1>
   <Image src={SeletedCar.image} width={300} height={250} />
   <div>Car Name : <span className='font-normal'>{SeletedCar.name} </span></div>
   <div>Charges Per Miles : <span className='font-normal'>${SeletedCar.charges} </span></div>
   <div>Total Cost : <span className='font-normal'>${SeletedCar.TotalCost} </span></div>
 </div>

    ) }
     
      {/* {JSON.stringify(SeletedCar,null,2)} */}
   

          <Elements stripe={stripePromise}>
          
      <CheckoutForm amount={amount} />
    </Elements> </div>
    </>
  );
}

export default page
