import React, { useState, useEffect } from 'react'
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
        role: 'Patients'
    });
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger entrance animations
        setIsVisible(true);
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const validateForm = () => {
        const errors = {};
        
        if (!formData.firstname.trim()) errors.firstname = 'First name is required';
        if (!formData.lastname.trim()) errors.lastname = 'Last name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Clear general error when user makes changes
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);

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
                setError('This email is already registered. Please use a different email or login to your existing account.');
                setFieldErrors({ email: 'Email already exists' });
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
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
                    {/* Image Section - Left on desktop with animation */}
                    <div className={`hidden lg:block flex-1 w-full max-w-xs mr-auto transform transition-all duration-1000 delay-300 ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                    }`}>
                        <img 
                            className={`w-full h-auto transform transition-all duration-700 ${
                                isImageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                            }`}
                            src={Signup} 
                            alt='Sign up illustration'
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>

                    {/* Form Section with animations */}
                    <div className={`flex flex-col items-center lg:items-start flex-1 w-full transform transition-all duration-1000 ${
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                    }`}>
                        <div className="w-full max-w-xl">
                            <h1 className={`font-bold text-3xl md:text-4xl mb-4 text-center lg:text-left text-gray-800 transform transition-all duration-700 delay-200 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                                Sign Up
                            </h1>
                            <p className={`font-normal text-sm md:text-base mb-9 text-center lg:text-left text-gray-500 transform transition-all duration-700 delay-300 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                                Let's get all set up so you can access your personal account.
                            </p>
                            
                            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                                {/* Name Fields with animation */}
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transform transition-all duration-700 delay-400 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
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
                                            className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-md bg-white 
                                                     focus:outline-none focus:border-bimec-green transition-all duration-200 hover:border-gray-400"
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
                                            className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-md bg-white 
                                                     focus:outline-none focus:border-bimec-green transition-all duration-200 hover:border-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone Fields with animation */}
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transform transition-all duration-700 delay-500 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
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
                                            className={`w-full px-4 py-2.5 text-sm border-2 rounded-md bg-white 
                                                     focus:outline-none transition-all duration-200 hover:border-gray-400
                                                     ${fieldErrors.email 
                                                       ? 'border-red-400 focus:border-red-500' 
                                                       : 'border-gray-300 focus:border-bimec-green'}`}
                                        />
                                        {fieldErrors.email && (
                                            <p className="text-red-500 text-xs mt-1 animate-shake">{fieldErrors.email}</p>
                                        )}
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
                                            className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-md bg-white 
                                                     focus:outline-none focus:border-bimec-green transition-all duration-200 hover:border-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Password Fields with animation */}
                                <div className={`relative transform transition-all duration-700 delay-600 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
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
                                            className={`w-full px-4 py-2.5 pr-12 text-sm border-2 rounded-md bg-white 
                                                     focus:outline-none transition-all duration-200 hover:border-gray-400
                                                     ${fieldErrors.password 
                                                       ? 'border-red-400 focus:border-red-500' 
                                                       : 'border-gray-300 focus:border-bimec-green'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-transform duration-200 hover:scale-110"
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
                                    {fieldErrors.password && (
                                        <p className="text-red-500 text-xs mt-1 animate-shake">{fieldErrors.password}</p>
                                    )}
                                </div>
                                
                                <div className={`relative transform transition-all duration-700 delay-700 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
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
                                            className={`w-full px-4 py-2.5 pr-12 text-sm border-2 rounded-md bg-white 
                                                     focus:outline-none transition-all duration-200 hover:border-gray-400
                                                     ${fieldErrors.confirmPassword 
                                                       ? 'border-red-400 focus:border-red-500' 
                                                       : 'border-gray-300 focus:border-bimec-green'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-transform duration-200 hover:scale-110"
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
                                    {fieldErrors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1 animate-shake">{fieldErrors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Terms and Conditions with animation */}
                                <div className={`flex items-start transform transition-all duration-700 delay-800 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 mt-0.5 border-gray-300 rounded focus:ring-2 focus:ring-bimec-green transition-all duration-200"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                        I agree to all the <a className="text-bimec-heavy-green hover:text-bimec-green transition-colors duration-200" href='#'>Terms</a> and <a className="text-[#FF8682] hover:text-[#ff6b6b] transition-colors duration-200" href='#'>Privacy Policies</a>
                                    </label>
                                </div>

                                {/* Error message with animation */}
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm transform transition-all duration-300 animate-shake">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button with animation */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-bimec-heavy-green text-white py-2.5 rounded-lg font-medium 
                                             hover:bg-bimec-green focus:outline-none focus:ring-4 focus:ring-green-300 
                                             transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg 
                                             disabled:bg-gray-400 disabled:hover:scale-100 ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '900ms' }}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                {/* Login Link with animation */}
                                <p className={`text-center text-sm transform transition-all duration-700 delay-[1000ms] ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                    Already have an account?{' '}
                                    <a className="text-[#FF8682] hover:text-[#ff6b6b] font-medium transition-colors duration-200" href='/login'>
                                        Login
                                    </a>
                                </p>

                                {/* Divider with animation */}
                                <div className={`flex items-center my-4 transform transition-all duration-700 delay-[1100ms] ${
                                    isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                }`}>
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-3 text-gray-500 text-sm">Or Sign up with</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                {/* Google Button with animation */}
                                <button
                                    type="button"
                                    className={`w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium 
                                             hover:bg-gray-50 flex items-center justify-center gap-2 
                                             transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '1200ms' }}
                                >
                                    <img src={Google_icon} alt="Google" className="w-5 h-5" />
                                    {/* Sign up with Google */}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom animation for error shake */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    10%, 30%, 50%, 70%, 90% {
                        transform: translateX(-5px);
                    }
                    20%, 40%, 60%, 80% {
                        transform: translateX(5px);
                    }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default SignUp