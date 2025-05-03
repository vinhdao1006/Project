import { useState } from 'react'
import Login_img from '../assets/image/Login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BimecHeader from '../components/Header/BimecHeader'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function SignIn() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', { email, password, role })
            .then(result => {
                console.log(result)
                if (result.data.message === "Success") {
                    const token = result.data.token;
                    if (token) {
                        handleRoleRedirect(token); 
                    } else {
                        console.error("Token is missing in the response");
                    }
                }
            })
            .catch(err => console.log(err))
    }

    // login with google
    const handleGoogleSuccess = (credentialResponse) => {
        const { credential } = credentialResponse

        axios.post('http://localhost:3001/google-login', { token: credential })
        .then((response) => {
            console.log(response.data)
            if (response.data.message === "Success") {
                const token = response.data.jwtToken;
                if (token) {
                    handleRoleRedirect(token); 
                } else {
                    console.error("Token is missing in the response");
                }
            }
        })
        .catch((error) => {
            console.error('Error Google login:', error);
        });
    }

    const handleGoogleError = () => {
        console.error('Login Google Failed:');
    }

    const handleRoleRedirect = (token) => {
        if (!token || typeof token !== 'string') {
            console.error("Invalid token:", token);
            return;
        }

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; 

        if (role === 'Admin') {
            navigate('/admin/dashboard'); 
        } else if (role === 'Doctor') {
            navigate('/doctor/dashboard');
        } else {
            navigate('/default/home');
        }
    }

    return (
        <div className='container mx-auto'>
            <BimecHeader />

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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setPassword(e.target.value)}
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
                            {/* <button
                                type="button"
                                className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            >
                                <img src={Google_icon} />
                            </button> */}
                            <div className='w-full flex items-center justify-center' >
                                <GoogleLogin 
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                />
                            </div>
                            
                        </form>
                    </div>
                </div>

                <img className='w-1/3' src={Login_img} alt='Sign up image' />
            </div>
        </div>
    )
}

export default SignIn