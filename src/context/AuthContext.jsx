import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (userData, jwtToken) => {
        setToken(jwtToken);
        setUser(userData);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
