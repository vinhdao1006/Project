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
    IdentificationIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setUserData(response.data);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
                        <p className="mt-4 text-gray-600">Loading profile...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-lg font-medium">{error}</div>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-bimec-green text-white rounded-lg hover:bg-bimec-heavy-green transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const profileFields = [
        { label: 'First Name', value: userData.firstname, icon: UserIcon },
        { label: 'Last Name', value: userData.lastname, icon: UserIcon },
        { label: 'Email', value: userData.email, icon: EnvelopeIcon },
        { label: 'Phone', value: userData.phone, icon: PhoneIcon },
        { label: 'Role', value: userData.role, icon: IdentificationIcon }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-x-hidden">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-bimec-green to-bimec-heavy-green py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className={`text-4xl font-light text-white text-center transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        My Profile
                    </h1>
                    <p className={`text-white/80 text-center mt-2 transform transition-all duration-1000 delay-200 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        Manage your personal information
                    </p>
                </div>
            </div>

            <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
                {/* Profile Card */}
                <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-1000 delay-400 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}>
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-bimec-light-green to-green-50 p-8">
                        <div className="flex items-center justify-center">
                            <div className="w-32 h-32 bg-bimec-green rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                                <UserIcon className="w-20 h-20 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-center mt-4 text-bimec-heavy-green">
                            {userData.firstname} {userData.lastname}
                        </h2>
                        <p className="text-center text-gray-600 mt-1">{userData.role}</p>
                    </div>

                    {/* Profile Information */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profileFields.map((field, index) => (
                                <div
                                    key={index}
                                    className={`transform transition-all duration-700 ${
                                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                                >
                                    <div className="coolinput">
                                        <label className="text" htmlFor={field.label}>
                                            <div className="flex items-center gap-2">
                                                <field.icon className="w-4 h-4" />
                                                {field.label}
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            className="input"
                                            id={field.label}
                                            value={field.value || 'Not provided'}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className={`mt-8 flex justify-center transform transition-all duration-1000 delay-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <button
                                onClick={() => navigate('/settings')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-bimec-green text-white rounded-lg hover:bg-bimec-heavy-green transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
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

                .coolinput input[type="text"].input {
                    padding: 11px 10px;
                    font-size: 0.875rem;
                    border: 1px #5f8d4d solid;
                    border-radius: 8px;
                    background: #ffffff;
                    transition: all 0.3s ease;
                }

                .coolinput input[type="text"].input:focus {
                    outline: none;
                    border-color: #285430;
                    box-shadow: 0 0 0 3px rgba(95, 141, 77, 0.1);
                }

                .coolinput input[type="text"].input:hover {
                    border-color: #285430;
                }

                .coolinput input[type="text"].input[readonly] {
                    background-color: #f9fafb;
                    cursor: default;
                }
            `}</style>
        </div>
    );
};

export default Profile;