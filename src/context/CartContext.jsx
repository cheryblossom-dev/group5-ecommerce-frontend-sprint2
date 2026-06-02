import { useState } from "react";
import { cartItems as initialCart, SHIPPING_FEE } from "@/data/cart";
import { CartContext } from "./useCart";

export function CartProvider({ children }) {
    const [items, setItems] = useState(initialCart);

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
    );
    const total = subtotal + SHIPPING_FEE;

    function incrementQty(id) {
        setItems((prev) =>
            prev.map((item) => {
                const itemId = item._id || item.id;

                if (itemId === id) {
                    const stock =
                        item.dbStock !== undefined ? item.dbStock : 99;
                    if (item.qty + 1 > stock) {
                        alert(`ขออภัย สามารถสั่งได้สูงสุด ${stock} ชิ้น`);
                        return item;
                    }
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            }),
        );
    }

    function decrementQty(id) {
        setItems((prev) =>
            prev
                .map((item) =>
                    (item._id || item.id) === id
                        ? { ...item, qty: item.qty - 1 }
                        : item,
                )
                .filter((item) => item.qty > 0),
        );
    }

    function removeItem(id) {
        setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
    }

    function addItem(product) {
        setItems((prev) => {
            const targetId = product._id || product.id;
            const targetName = product.productname || product.name;

            const amountToAdd = product.selectedQty || 1;
            const stock = product.dbStock !== undefined ? product.dbStock : 99;

            const existing = prev.find(
                (item) => (item._id || item.id) === targetId,
            );

            if (existing) {
                if (existing.qty + amountToAdd > stock) {
                    alert(
                        `รายการสินค้าถูกจอง หรือ ไม่เพียงพอ (สินค้าเหลือ ${stock} ชิ้น)`,
                    );
                    return prev;
                }
                return prev.map((item) =>
                    (item._id || item.id) === targetId
                        ? { ...item, qty: item.qty + amountToAdd }
                        : item,
                );
            }

            if (amountToAdd > stock) {
                alert(`สินค้าเหลือเพียง ${stock} ชิ้น`);
                return prev;
            }

            return [
                ...prev,
                {
                    ...product,
                    _id: targetId,
                    id: targetId,
                    name: targetName,
                    productname: targetName,
                    qty: amountToAdd,
                    price: product.price,
                    dbStock: stock,
                },
            ];
        });
    }

    return (
        <CartContext.Provider
            value={{
                items,
                subtotal,
                total,
                incrementQty,
                decrementQty,
                removeItem,
                addItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
