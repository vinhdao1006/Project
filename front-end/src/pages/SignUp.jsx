import React, { useState } from 'react'
import Signup from '../assets/image/Signup.png'
import Google_icon from '../assets/icon/icon_google.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BimecHeader from '../components/Header/BimecHeader'
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/BimecFooter'

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
            const response = await axios.post('http://localhost:3001/register', {
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto">
                <BimecHeader />

                <div className='flex items-center justify-center min-h-screen'>
                    <img className='w-1/4' src={Signup} alt='Sign up image' />

                    <div className="ml-8">
                        <div className="flex flex-col items-center justify-center min-h-screen">
                            <p className="font-bold text-5xl mb-4">Sign Up</p>
                            <p className="font-normal text-lg mb-4">Let's get all set up so you can access your personal account.</p>
                            <form className="w-[700px] p-6 rounded-lg space-y-4" onSubmit={handleSubmit}>
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                </div>

                            {/* Role Dropdown */}
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                                        Register as
                                    </label>
                                    <Menu as="div" className="relative inline-block text-left w-full">
                                        <div>
                                            <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                                                {role} 
                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setFormData(prev => ({ ...prev, role: 'Doctor' }))}
                                                            className={`block w-full px-4 py-2 text-left text-sm ${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            Doctor
                                                        </button>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setFormData(prev => ({ ...prev, role: 'Admin' }))}
                                                            className={`block w-full px-4 py-2 text-left text-sm ${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            Admin
                                                        </button>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setFormData(prev => ({ ...prev, role: 'Patient' }))}
                                                            className={`block w-full px-4 py-2 text-left text-sm ${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            Patient
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div> */}

                                {/* Email and Phone Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
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
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                                            🔒 {/* Replace with an icon */}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                                            🔒 {/* Replace with an icon */}
                                        </span>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                        I agree to all the <a className="text-blue-500" href='#'>Terms</a> and <a className="text-red-500" href='#'>Privacy Policies</a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#285430] text-white py-2 rounded-lg font-medium hover:bg-[#5F8D4E] focus:outline-none focus:ring focus:ring-green-300"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                {/* Login Link */}
                                <p className="text-center text-sm mt-4">
                                    Already have an account?{' '}
                                    <a className="text-blue-500" href='/login'>Login</a>
                                </p>

                                {/* Divider */}
                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-2 text-gray-500 text-sm">Or Sign up with</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                {/* Google Button */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    <img src={Google_icon} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp