import { fetchApi } from "../utils/api";

export const getCart = async () => {
    return await fetchApi("/cart");
};

export const addToCart = async (productId, quantity = 1) => {
    return await fetchApi("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
    });
};
