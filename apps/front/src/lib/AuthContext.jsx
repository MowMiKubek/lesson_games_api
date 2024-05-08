import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}