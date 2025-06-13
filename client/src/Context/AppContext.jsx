import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);

    // Check token expiration
    const checkTokenExpiration = useCallback(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Convert to seconds
                
                if (decoded.exp < currentTime) {
                    // Token has expired
                    updateToken(null);
                    updateUser(null);
                    navigate("/");
                    toast.error("Session expired. Please login again.");
                } else {
                    // Token is still valid, check if it's about to expire
                    const timeUntilExpiration = decoded.exp - currentTime;
                    if (timeUntilExpiration < 300) { // 5 minutes before expiration
                        toast.warning("Your session will expire soon. Please save your work.");
                    }
                }
            } catch (error) {
                console.error('Error checking token expiration:', error);
                // If there's an error decoding the token, it's probably invalid
                updateToken(null);
                updateUser(null);
                navigate("/");
            }
        }
    }, [token, navigate]);

    // Set up periodic token check
    useEffect(() => {
        // Check immediately
        checkTokenExpiration();
        
        // Then check every minute
        const interval = setInterval(checkTokenExpiration, 60000);
        
        return () => clearInterval(interval);
    }, [checkTokenExpiration]);

    // Synchronized token update function
    const updateToken = useCallback((newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            axios.defaults.headers.common["Authorization"] = newToken;
        } else {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        }
        setToken(newToken);
    }, []);

    // Synchronized user update function
    const updateUser = useCallback((newUser) => {
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
        } else {
            localStorage.removeItem("user");
        }
        setUser(newUser);
    }, []);

    // Handle cross-tab storage events
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "token") {
                const newToken = e.newValue;
                updateToken(newToken);
                if (!newToken) {
                    navigate("/");
                }
            }
            if (e.key === "user") {
                const newUser = e.newValue ? JSON.parse(e.newValue) : null;
                updateUser(newUser);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [navigate, updateToken, updateUser]);

    // Set up axios interceptor for token expiration
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    updateToken(null);
                    updateUser(null);
                    navigate("/");
                    toast.error("Session expired. Please login again.");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate, updateToken, updateUser]);

    // Initialize axios headers
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
        setLoading(false);
    }, [token]);

    const login = useCallback((userData, authToken) => {
        try {
            // Update everything in a synchronized way
            updateToken(authToken);
            updateUser(userData);
            
            // Trigger storage event for other tabs
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'token',
                newValue: authToken
            }));
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'user',
                newValue: JSON.stringify(userData)
            }));
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Failed to save login information');
        }
    }, [updateToken, updateUser]);

    const logout = useCallback(() => {
        try {
            // Update everything in a synchronized way
            updateToken(null);
            updateUser(null);
            
            // Trigger storage event for other tabs
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'token',
                newValue: null
            }));
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'user',
                newValue: null
            }));
            
            navigate("/");
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout properly');
        }
    }, [navigate, updateToken, updateUser]);

    const value = {
        navigate,
        axios,
        token,
        setToken: updateToken,
        user,
        setUser: updateUser,
        input,
        setInput,
        login,
        logout,
        loading
    };

    return <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};