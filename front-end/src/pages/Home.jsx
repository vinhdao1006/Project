import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/home')
        .then(result => {
            console.log(result)
            if(result.data !== "Success") {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <div className='max-w-xl mx-auto pt-4 pb-4'>
                <div className="flex-shrink-0">
                    <a href="/home" className="text-[#181C32] font-bold text-xl">
                        BIMEC
                    </a>
                </div>
            </div>
            <nav className='bg-[#5F8D4E]'>
                <div className='max-w-6xl mx-auto px-4'>
                    <div className='flex justify-between items-center h-16'>
                        {/* Logo */}
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Home