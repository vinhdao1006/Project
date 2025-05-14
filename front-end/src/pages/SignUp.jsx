import React, { useState } from 'react'
import Signup from '../assets/image/Signup.png'
import Google_icon from '../assets/icon/icon_google.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BimecHeader from '../components/Header/BimecHeader'
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Patient'
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Create new user
            const response = await axios.post('http://localhost:3001/api/users/register', {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                role: formData.role
            },{
                headers: {
                  'Content-Type': 'application/json'
                }
              });

            if (response.data.message === 'User registered successfully') {
                navigate('/login');
            }
        } catch (err) {
            if (err.response?.data?.message === 'Email already exists') {
                setError('Email already exists. Please use a different email or login.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto px-4'>
            <BimecHeader />

            <div className='flex items-center justify-center min-h-[calc(100vh-100px)]'>
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full max-w-5xl">
                    {/* Image Section - Left on desktop */}
                    <div className="hidden lg:block flex-1 w-full max-w-xs mr-auto">
                        <img 
                            className='w-full h-auto' 
                            src={Signup} 
                            alt='Sign up illustration' 
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex flex-col items-center lg:items-start flex-1 w-full">
                        <div className="w-full max-w-xl">
                            <h1 className="font-bold text-3xl md:text-4xl mb-6 text-center lg:text-left text-gray-800">Sign Up</h1>
                            <p className="font-normal text-sm md:text-base mb-8 text-center lg:text-left text-gray-500">
                                Let's get all set up so you can access your personal account.
                            </p>
                            
                            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label 
                                            className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                            htmlFor="firstName"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstname"
                                            placeholder="Enter first name"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label 
                                            className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                            htmlFor="lastName"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastname"
                                            placeholder="Enter last name"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            name="email"
                                            placeholder="Enter email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label 
                                            className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                            htmlFor="phoneNumber"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Password Fields */}
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
                                            name="password"
                                            placeholder="Enter password"
                                            value={formData.password}
                                            onChange={handleChange}
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
                                
                                <div className="relative">
                                    <label 
                                        className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10" 
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 pr-12 text-sm border-[1px] border-gray-400 rounded-sm bg-white 
                                                     focus:outline-none focus:border-gray-400 transition-colors duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? (
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

                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 mt-0.5 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                        I agree to all the <a className="text-[#285430] hover:text-[#1e3e22]" href='#'>Terms</a> and <a className="text-[#FF8682] hover:text-[#ff6b6b]" href='#'>Privacy Policies</a>
                                    </label>
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
                                    disabled={loading}
                                    className="w-full bg-[#285430] text-white py-2.5 rounded-lg font-medium 
                                             hover:bg-[#1e3e22] focus:outline-none focus:ring-4 focus:ring-green-300 
                                             transition-colors duration-200 disabled:bg-gray-400"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                {/* Login Link */}
                                <p className="text-center text-sm">
                                    Already have an account?{' '}
                                    <a className="text-[#FF8682] hover:text-[#ff6b6b] font-medium" href='/login'>
                                        Login
                                    </a>
                                </p>

                                {/* Divider */}
                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-3 text-gray-500 text-sm">Or Sign up with</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                {/* Google Button */}
                                <button
                                    type="button"
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                                >
                                    <img src={Google_icon} alt="Google" className="w-5 h-5" />
                                    {/* Sign up with Google */}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp