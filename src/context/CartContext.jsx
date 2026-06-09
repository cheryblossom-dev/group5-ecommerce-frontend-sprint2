import { useState, useEffect } from "react";
import { CartContext } from "./useCart";
import { useAuth } from "./AuthContext";
import {
    getCart,
    addCart,
    updateCartItem,
    clearCart as clearCartApi,
} from "@/services/cart";

const SHIPPING_FEE = 30;

// Normalize API cart items → shape the UI expects (qty, _id as productId)
function normalizeItems(apiItems = []) {
    return apiItems.map((item) => {
        const productId = item.productId?._id ?? item.productId;
        return {
            ...item,
            _id: productId,
            id: productId,
            qty: item.quantity,
        };
    });
}

export function CartProvider({ children }) {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    useEffect(() => {
        const loadCartData = async () => {
            if (authLoading) return;

            if (!user) {
                setItems([]);
                setCartLoading(false);
                return;
            }

            setCartLoading(true);
            try {
                // 💡 เปลี่ยนมาใช้ getCart() แทนเช่นกันครับ
                const res = await getCart();
                setItems(normalizeItems(res.data?.items));
            } catch (err) {
                console.error("Load cart failed", err);
            } finally {
                setCartLoading(false);
            }
        };

        loadCartData();
    }, [user, authLoading]);

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
    );
    const total = subtotal + SHIPPING_FEE;

    async function addItem(product) {
        const productId = product._id || product.id;
        const quantity = product.selectedQty || 1;
        const res = await addCart(productId, quantity);
        setItems(normalizeItems(res.data?.items));
    }

    async function incrementQty(id) {
        const item = items.find((i) => (i._id || i.id) === id);
        if (!item) return;

        const newQty = item.qty + 1;

        setItems((prevItems) =>
            prevItems.map((i) =>
                (i._id || i.id) === id ? { ...i, qty: newQty } : i,
            ),
        );

        try {
            await updateCartItem(id, newQty);
        } catch (error) {
            console.error("อัปเดตไม่สำเร็จ:", error);
            alert("ขออภัย ไม่สามารถเพิ่มจำนวนสินค้าได้ (สต๊อกอาจจะหมด)");

            // 💡 เปลี่ยนมาใช้ getCart() แทนครับ
            const res = await getCart();
            setItems(normalizeItems(res.data?.items));
        }
    }

    async function decrementQty(id) {
        const item = items.find((i) => (i._id || i.id) === id);
        if (!item || item.qty <= 1) return;

        const newQty = item.qty - 1;

        setItems((prevItems) =>
            prevItems.map((i) =>
                (i._id || i.id) === id ? { ...i, qty: newQty } : i,
            ),
        );

        try {
            await updateCartItem(id, newQty);
        } catch (error) {
            console.error("อัปเดตไม่สำเร็จ:", error);

            // 💡 เปลี่ยนมาใช้ getCart() แทนครับ
            const res = await getCart();
            setItems(normalizeItems(res.data?.items));
        }
    }

    async function removeItem(id) {
        const res = await updateCartItem(id, 0);
        setItems(normalizeItems(res.data?.items));
    }

    async function clearCart() {
        await clearCartApi();
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                subtotal,
                total,
                cartLoading,
                addItem,
                incrementQty,
                decrementQty,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
