import { useState } from 'react'   
import Bimec_logo from '../assets/image/Bimec_logo.png' 
import Login_img from '../assets/image/Login.png'
import Google_icon from '../assets/image/icon_google.png'

function SignIn() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDafault()
        axios.post('http://localhost3001/register', {firstname, lastname, phone, email, password, confirmpassword})
        .then(result => {console.log(result)
        navigate('./login')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='container mx-auto'>
            <div className='mt-6 flex justify-start'>
                <img src={Bimec_logo} alt='Bimec Logo' className='mr-4'/>
                <p className='font-bold text-3xl'>BIMEC</p>
            </div>
            
            <div className='flex items-center justify-center min-h-screen'>
                <div className="mr-8">
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <p className="font-bold text-5xl mb-4">Login</p>
                        <p className="font-normal text-lg mb-4">Login to access your BiMec account.</p>
                        <form className="w-[500px] p-6 rounded-lg space-y-4" onSubmit={handleSubmit}>
                            {/* Name Fields */}
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                    Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            </div>
                            {/* Password Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                                    🔒 {/* Replace with an icon */}
                                    </span>
                                </div>
                            </div>
                            {/* Remember me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                    Remember me 
                                </label>
                                <a className='text-sm ml-56 text-[#FF8682]' href='#'>Forgot password</a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#285430] text-white py-2 rounded-lg font-medium hover:bg-[#5F8D4E] focus:outline-none focus:ring focus:ring-green-300"
                                >
                                Login
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-sm mt-4">
                                Don't have an account?{' '}
                                <a className="text-blue-500" href='/register'>Sign up</a>
                            </p>

                            {/* Divider */}
                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-2 text-gray-500 text-sm">Or login with</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            {/* Google Button */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                >
                                <img src={Google_icon}/>
                            </button>
                        </form>
                        </div>
                </div>
                
                <img className='w-1/3' src={Login_img} alt='Sign up image'/>
            </div>
        </div>
    )
}

export default SignIn