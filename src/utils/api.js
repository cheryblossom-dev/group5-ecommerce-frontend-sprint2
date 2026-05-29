const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const fetchApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error from server");
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error.message);
        throw error;
    }
};
