import { fetchApi } from "../utils/api";

export const login = async (email, password) => {
    return await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
};

export const getMe = async () => {
    return await fetchApi("/users/me");
};
