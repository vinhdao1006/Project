import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/BimecFooter';
import { jwtDecode } from 'jwt-decode';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    LockClosedIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const response = await axios.get(`http://localhost:3001/api/users/${decodedToken.email}`);
                const { firstname, lastname, email, phone } = response.data;
                setFormData(prev => ({
                    ...prev,
                    firstname,
                    lastname,
                    email,
                    phone
                }));
                setIsVisible(true);
            } catch (error) {
                setError('Failed to fetch user data');
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

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
        setSuccess(null);

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            // Update profile information
            await axios.put(`http://localhost:3001/api/users/${decodedToken.email}`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                phone: formData.phone
            });

            // Update password if provided
            if (formData.currentPassword && formData.newPassword) {
                if (formData.newPassword !== formData.confirmNewPassword) {
                    setError('New passwords do not match');
                    return;
                }

                await axios.put(`http://localhost:3001/api/users/${decodedToken.email}/password`, {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                });
            }

            setSuccess('Profile updated successfully');
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
                        <p className="mt-4 text-gray-600">Loading settings...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-x-hidden">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-bimec-green to-bimec-heavy-green py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className={`text-4xl font-light text-white text-center transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        Account Settings
                    </h1>
                    <p className={`text-white/80 text-center mt-2 transform transition-all duration-1000 delay-200 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        Update your profile information and password
                    </p>
                </div>
            </div>

            <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
                {/* Settings Card */}
                <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-1000 delay-400 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}>
                    <div className="p-8">
                        {/* Back to Profile Button */}
                        <button
                            onClick={() => navigate('/profile')}
                            className={`mb-6 flex items-center gap-2 text-gray-600 hover:text-bimec-green transition-colors transform ${
                                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Back to Profile
                        </button>

                        {/* Alerts */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                                <span className="text-red-700">{error}</span>
                            </div>
                        )}
                        
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                <span className="text-green-700">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Information Section */}
                            <div>
                                <h2 className="text-xl font-semibold text-bimec-heavy-green mb-6">Profile Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`transform transition-all duration-700 ${
                                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '700ms' }}>
                                        <div className="coolinput">
                                            <label className="text" htmlFor="firstname">
                                                <div className="flex items-center gap-2">
                                                    <UserIcon className="w-4 h-4" />
                                                    First Name
                                                </div>
                                            </label>
                                            <input
                                                type="text"
                                                className="input"
                                                id="firstname"
                                                name="firstname"
                                                value={formData.firstname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={`transform transition-all duration-700 ${
                                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '800ms' }}>
                                        <div className="coolinput">
                                            <label className="text" htmlFor="lastname">
                                                <div className="flex items-center gap-2">
                                                    <UserIcon className="w-4 h-4" />
                                                    Last Name
                                                </div>
                                            </label>
                                            <input
                                                type="text"
                                                className="input"
                                                id="lastname"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={`transform transition-all duration-700 ${
                                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '900ms' }}>
                                        <div className="coolinput">
                                            <label className="text" htmlFor="email">
                                                <div className="flex items-center gap-2">
                                                    <EnvelopeIcon className="w-4 h-4" />
                                                    Email
                                                </div>
                                            </label>
                                            <input
                                                type="email"
                                                className="input"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className={`transform transition-all duration-700 ${
                                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: '1000ms' }}>
                                        <div className="coolinput">
                                            <label className="text" htmlFor="phone">
                                                <div className="flex items-center gap-2">
                                                    <PhoneIcon className="w-4 h-4" />
                                                    Phone
                                                </div>
                                            </label>
                                            <input
                                                type="tel"
                                                className="input"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className={`border-t pt-8 transform transition-all duration-700 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: '1100ms' }}>
                                <h2 className="text-xl font-semibold text-bimec-heavy-green mb-6">Change Password</h2>
                                <div className="space-y-6">
                                    <div className="coolinput">
                                        <label className="text" htmlFor="currentPassword">
                                            <div className="flex items-center gap-2">
                                                <LockClosedIcon className="w-4 h-4" />
                                                Current Password
                                            </div>
                                        </label>
                                        <input
                                            type="password"
                                            className="input"
                                            id="currentPassword"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="coolinput">
                                            <label className="text" htmlFor="newPassword">
                                                <div className="flex items-center gap-2">
                                                    <LockClosedIcon className="w-4 h-4" />
                                                    New Password
                                                </div>
                                            </label>
                                            <input
                                                type="password"
                                                className="input"
                                                id="newPassword"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="coolinput">
                                            <label className="text" htmlFor="confirmNewPassword">
                                                <div className="flex items-center gap-2">
                                                    <LockClosedIcon className="w-4 h-4" />
                                                    Confirm New Password
                                                </div>
                                            </label>
                                            <input
                                                type="password"
                                                className="input"
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                value={formData.confirmNewPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className={`flex justify-end gap-4 pt-6 transform transition-all duration-700 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: '1200ms' }}>
                                <button
                                    type="button"
                                    onClick={() => navigate('/profile')}
                                    className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-bimec-green text-white rounded-xl hover:bg-bimec-heavy-green transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Custom Styles for Cool Input */}
            <style jsx>{`
                .coolinput {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    position: static;
                }

                .coolinput label.text {
                    font-size: 0.75rem;
                    color: #285430;
                    font-weight: 700;
                    position: relative;
                    top: 0.5rem;
                    margin: 0 0 0 7px;
                    padding: 0 3px;
                    background: #ffffff;
                    width: fit-content;
                    z-index: 10;
                }

                .coolinput input[type="text"].input,
                .coolinput input[type="email"].input,
                .coolinput input[type="tel"].input,
                .coolinput input[type="password"].input {
                    padding: 11px 10px;
                    font-size: 0.875rem;
                    border: 2px #5f8d4d solid;
                    border-radius: 8px;
                    background: #ffffff;
                    transition: all 0.3s ease;
                }

                .coolinput input.input:focus {
                    outline: none;
                    border-color: #285430;
                    box-shadow: 0 0 0 3px rgba(95, 141, 77, 0.1);
                }

                .coolinput input.input:hover {
                    border-color: #285430;
                }

                .coolinput input.input[disabled] {
                    background-color: #f9fafb;
                    cursor: not-allowed;
                    opacity: 0.7;
                }
            `}</style>
        </div>
    );
};

export default Settings;