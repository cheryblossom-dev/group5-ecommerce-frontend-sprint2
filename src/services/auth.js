import { fetchApi } from "../utils/api";

export const register = async (userData) => {
    return await fetchApi("/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

export const login = async (email, password) => {
    return await fetchApi("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
};

export const logout = async () => {
    return await fetchApi("/users/logout", {
        method: "POST",
    });
};
