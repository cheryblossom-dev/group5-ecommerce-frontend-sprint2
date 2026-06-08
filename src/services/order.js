import { fetchApi } from "../utils/api";

export const createOrder = async (orderData) => {
    return await fetchApi("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });
};

export const getMyOrders = async () => {
    return await fetchApi("/orders");
};

export const getOrderById = async (id) => {
    return await fetchApi(`/orders/${id}`);
};

// Admin Only
export const payOrder = async (id) => {
    return await fetchApi(`/orders/${id}/pay`, { method: "PATCH" });
};

export const cancelOrder = async (id) => {
    return await fetchApi(`/orders/${id}/cancel`, { method: "PATCH" });
};
