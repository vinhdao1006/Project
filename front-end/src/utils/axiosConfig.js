import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Check if token is expired
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                // Token is expired, try to refresh it
                return refreshToken().then(newToken => {
                    config.headers.Authorization = `Bearer ${newToken}`;
                    return config;
                }).catch(error => {
                    // If refresh fails, redirect to login
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return Promise.reject(error);
                });
            }

            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh fails, redirect to login
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Function to refresh the token
const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/users/refresh-token', {}, {
            withCredentials: true
        });
        
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        return newToken;
    } catch (error) {
        throw error;
    }
};

export default axiosInstance; 