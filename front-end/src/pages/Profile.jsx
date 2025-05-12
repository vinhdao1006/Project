import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/BimecFooter';
import { jwtDecode } from 'jwt-decode';

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
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-red-500">{error}</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow w-2/5 px-4 py-8 mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 w-full">
                    <h1 className="text-3xl font-bold text-bimec-heavy-green mb-6">Profile</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{userData.firstname || 'Not provided'}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{userData.lastname || 'Not provided'}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{userData.email || 'Not provided'}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{userData.phone || 'Not provided'}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{userData.role || 'Not provided'}</div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => navigate('/settings')}
                            className="bg-bimec-green text-white px-4 py-2 rounded hover:bg-bimec-heavy-green transition"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;