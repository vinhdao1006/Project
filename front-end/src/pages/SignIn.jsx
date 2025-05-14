import { useState } from 'react'
import Login_img from '../assets/image/Login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BimecHeader from '../components/Header/BimecHeader'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', {
                email: email,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                handleRoleRedirect(response.data.token);
                console.log('Login success:', response.data);
            }
            else {
                console.log('Full response from backend:', response);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password');
        }
    };

    // login with google
    const handleGoogleSuccess = (credentialResponse) => {
        const { credential } = credentialResponse

        axios.post('http://localhost:3001/api/users/google-login', { token: credential })
        .then((response) => {
            if (response.data.message === "Success") {
                const token = response.data.jwtToken;
                if (token) {
                    localStorage.setItem('token', token);
                    console.log('Google login success:', response.data);
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
        console.log('Decoded token:', decodedToken);
        if (role === 'Admin') {
            navigate('/admin/dashboard'); 
        } else if (role === 'Doctor') {
            navigate('/doctor/patients');
        } else {
            navigate('/default/home');
        }
    }

    return (
        <div className='container mx-auto px-4'>
            <BimecHeader />

            <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full max-w-4xl">
                    {/* Form Section */}
                    <div className="flex flex-col items-center lg:items-start flex-1 w-full">
                        <div className="w-full max-w-md">
                            <h1 className="font-bold text-3xl md:text-4xl mb-3 text-center lg:text-left text-gray-800">Login</h1>
                            <p className="font-normal text-sm md:text-base mb-9 text-center lg:text-left text-gray-500">
                                Login to access your BiMec account.
                            </p>
                            
                            <form className="w-full space-y-5" onSubmit={handleSubmit}>
                                {/* Email Field with new style */}
                                <div className="relative">
                                    <label 
                                        className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                    />
                                </div>

                                {/* Password Field with new style */}
                                <div className="relative">
                                    <label 
                                        className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-2.5 pr-12 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <a className='text-sm text-[#FF8682] hover:text-[#ff6b6b]' href='#'>
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#285430] text-white py-2.5 rounded-lg font-medium 
                                             hover:bg-[#1e3e22] focus:outline-none focus:ring-4 focus:ring-green-300 
                                             transition-colors duration-200"
                                >
                                    Login
                                </button>

                                {/* Sign up Link */}
                                <p className="text-center text-sm">
                                    Don't have an account?{' '}
                                    <a className="text-[#FF8682] hover:text-[#ff6b6b] font-medium" href='/register'>
                                        Sign up
                                    </a>
                                </p>

                                {/* Divider */}
                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-3 text-gray-500 text-sm">Or login with</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                {/* Google Button */}
                                <div className='w-full flex items-center justify-center'>
                                    <GoogleLogin 
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        width="100%"
                                        theme="outline"
                                        shape="rectangular"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className="hidden lg:block flex-1 w-full max-w-sm">
                        <img 
                            className='w-full h-auto' 
                            src={Login_img} 
                            alt='Login illustration' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn