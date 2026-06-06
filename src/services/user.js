import { fetchApi } from "../utils/api";

export const getMe = async () => {
    return await fetchApi("/users/profile");
};

export const updateMe = async (nameData) => {
    return await fetchApi("/users/me", {
        method: "PUT",
        body: JSON.stringify(nameData),
    });
};

// Address Book
export const getAddresses = async () => {
    return await fetchApi("/users/me/addresses");
};

export const createAddress = async (addressData) => {
    return await fetchApi("/users/me/addresses", {
        method: "POST",
        body: JSON.stringify(addressData),
    });
};

export const updateAddress = async (addressId, addressData) => {
    return await fetchApi(`/users/me/addresses/${addressId}`, {
        method: "PUT",
        body: JSON.stringify(addressData),
    });
};

export const deleteAddress = async (addressId) => {
    return await fetchApi(`/users/me/addresses/${addressId}`, {
        method: "DELETE",
    });
};

export const changePassword = async (data) => {
    return await fetchApi("/users/me/password", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};
