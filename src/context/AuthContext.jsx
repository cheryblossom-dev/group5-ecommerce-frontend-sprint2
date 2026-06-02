/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { login, logout } from "../services/auth";
import { getMe } from "../services/user";
import { fetchApi } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                // check /users/me
                const response = await fetchApi("/users/me");
                if (response && response.data) {
                    setUser(response.data);
                }
            } catch {
                // if not login = null (guest)
                // แจ้งไว้ใน console ละ ช่างมัน เส้นมาหายแดงเอง
                console.log("No user logged in (Guest mode)");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, []);

    const handleLogin = async (email, password) => {
        await login(email, password);

        const userData = await getMe();
        setUser(userData);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, handleLogin, handleLogout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
