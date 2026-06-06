/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { login, logout } from "../services/auth";
import { getMe } from "../services/user";

import SkeletonLoader from "@/components/ui/SkeletonLoader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                // check /users/me (ถ้ามีคุกกี้ api.js จะส่งไปให้อัตโนมัติ)
                const response = await getMe();
                if (response && response.data) {
                    setUser(response.data);
                } else if (response) {
                    setUser(response);
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
        // 1. สั่งล็อกอินให้หลังบ้านยัด Cookie ลงเบราว์เซอร์
        await login(email, password);

        // 2. ขอข้อมูล User มาเก็บลง State
        const userData = await getMe();
        // รองรับทั้งกรณีที่ API ตอบกลับมาเป็นก้อนตรงๆ หรือซ้อนอยู่ใน .data
        setUser(userData.data || userData);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    const updateUser = (data) => setUser((prev) => ({ ...prev, ...data }));

    return (
        <AuthContext.Provider
            value={{ user, loading, handleLogin, handleLogout, updateUser }}
        >
            {loading ? <SkeletonLoader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
