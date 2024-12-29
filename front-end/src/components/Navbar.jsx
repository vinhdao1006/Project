import { Icon } from 'lucide-react'
import React from 'react'


const Navbar = () => {
  return (
    <div className="w-screen h-16">
        <header className='w-full h-16 bg-bimec-green flex items-center'>
            <a href="/" className="relative ml-5 pl-44 text-home-button font-bold">Home</a>
            <a href="/" className="relative ml-5 text-white">About us</a>
            <a href="/" className="relative ml-5 text-white">Services</a>
            <a href="/" className="relative ml-5 text-white">Doctors</a>
            <a href="/" className="relative ml-5 text-white">News</a>
            <a href="/" className="relative ml-5 text-white">Contact</a>

            <div className="ml-auto flex mr-32 items-center">
                <button className="ml-5 submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                <input type="text" className="rounded-full w-56 h-8 ml-5 pl-5" placeholder="Search here..."></input>
            </div>
        </header>
    </div>


  )
}

export default Navbar