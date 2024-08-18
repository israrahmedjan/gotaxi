"use client"
import Image from 'next/image'
import React from 'react'
import { UserButton,SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link';
function NavBar() {
  const { isSignedIn, user, isLoaded } = useUser();

    
  return <> 
  
    <div className='flex justify-between
     p-3 px-10 border-b-[1px] shadow-sm'>
        <div className='flex gap-10 items-center'>
          <Link href="/">
        <Image src='/logo.png' alt='logo' width={120} height={60} />
        </Link>
           
            <div className='hidden md:flex gap-6'>
            <Link href="/"> <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Home</h2></Link>
              
              <Link href="/aboutus">  <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>About Us</h2></Link>
                 <Link href="/contactus"> <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Contact Us</h2></Link>
            </div>
        </div>
        {(isSignedIn)?
        <UserButton afterSignOutUrl="/"/>:<div><SignInButton className="bg-gray-600 text-white p-2" /></div>
}
    </div>
 
  </>
}

export default NavBar