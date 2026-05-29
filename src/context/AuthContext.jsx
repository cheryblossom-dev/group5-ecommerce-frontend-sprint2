import { createContext, useState, useEffect, useContext } from "react";
import { fetchApi } from "../utils/api";
import { login, logout } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await fetchApi("/users/me"); // fetch
                setUser(userData);
            } catch {
                setUser(null); // not login || cookie expired
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const handleLogin = async (email, password) => {
        const data = await login(email, password);
        setUser(data.user); // state update
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
