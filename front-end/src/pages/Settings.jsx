import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/BimecFooter';
import { jwtDecode } from 'jwt-decode';

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
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-bimec-heavy-green mb-6">Settings</h1>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                />
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bimec-green focus:ring-bimec-green"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-bimec-green text-white px-4 py-2 rounded hover:bg-bimec-heavy-green transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Settings; 