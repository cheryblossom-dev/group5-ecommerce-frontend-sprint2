import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";
import { SHIPPING_FEE } from "@/data/cart";
import { getAddresses } from "@/services/user";

export default function DCartCheckoutScreen() {
    const navigate = useNavigate();
    // ดึง Context ตะกร้า
    const { items, subtotal, total, incrementQty, decrementQty, removeItem } =
        useCart();

    // State สำหรับที่อยู่
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addrLoading, setAddrLoading] = useState(true);

    // โหลดที่อยู่
    useEffect(() => {
        getAddresses()
            .then((res) => {
                const data = res.data ?? [];
                setAddresses(data);
                const defaultAddr = data.find((a) => a.isDefault);
                if (defaultAddr) setSelectedAddressId(defaultAddr._id);
            })
            .catch((err) => console.error("Load address failed:", err))
            .finally(() => setAddrLoading(false));
    }, []);

    // ตะกร้าว่าง
    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#F8F6F2]">
                <p className="text-xl font-bold text-[#1C1C1A]">
                    ตะกร้าของคุณว่างเปล่า
                </p>
                <button
                    onClick={() => navigate("/catalog")}
                    className="text-[#5B8C5A] hover:underline font-bold"
                >
                    กลับไปเลือกสินค้า
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F6F2] py-10 px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                {/* left- order list n address */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#DDD9D0]">
                        <h2 className="text-lg font-bold mb-4 border-b pb-2">
                            1. รายการสินค้า
                        </h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id || item._id}
                                    className="flex justify-between items-center bg-[#F8F6F2] p-3 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1C1C1A]">
                                            {item.name || item.productname}
                                        </p>
                                        <p className="text-sm text-[#5B8C5A]">
                                            ฿{item.price}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                decrementQty(
                                                    item.id || item._id,
                                                )
                                            }
                                            className="w-8 h-8 bg-white rounded shadow-sm font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="w-4 text-center font-bold">
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() =>
                                                incrementQty(
                                                    item.id || item._id,
                                                )
                                            }
                                            className="w-8 h-8 bg-white rounded shadow-sm font-bold"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeItem(item.id || item._id)
                                            }
                                            className="ml-4 text-red-500 text-sm font-bold"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#DDD9D0]">
                        <h2 className="text-lg font-bold mb-4 border-b pb-2">
                            2. ที่อยู่จัดส่ง{" "}
                            <span className="text-red-500">*</span>
                        </h2>
                        {addrLoading ? (
                            <p className="text-sm">กำลังโหลดข้อมูลที่อยู่...</p>
                        ) : addresses.length === 0 ? (
                            <p className="text-red-500 text-sm font-bold">
                                กรุณาเพิ่มที่อยู่ในหน้าโปรไฟล์ก่อนทำการสั่งซื้อ
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {addresses.map((addr) => (
                                    <label
                                        key={addr._id}
                                        className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer ${selectedAddressId === addr._id ? "border-[#5B8C5A] bg-[#EAF2EA]" : "border-[#DDD9D0]"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={
                                                selectedAddressId === addr._id
                                            }
                                            onChange={() =>
                                                setSelectedAddressId(addr._id)
                                            }
                                            className="mt-1 accent-[#5B8C5A]"
                                        />
                                        <div>
                                            <p className="font-bold text-sm">
                                                {addr.label} ({addr.recieveName}
                                                )
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {addr.recieveAddress}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* right - summary */}
                <div className="w-full md:w-80 h-fit bg-white p-6 rounded-2xl shadow-sm border border-[#DDD9D0] sticky top-24">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">
                        สรุปยอด
                    </h2>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>ค่าสินค้า</span>
                        <span>฿{subtotal}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                        <span>ค่าจัดส่ง</span>
                        <span>฿{SHIPPING_FEE}</span>
                    </div>
                    <div className="flex justify-between font-black text-xl text-[#5B8C5A] mb-6 border-t pt-4">
                        <span>ยอดสุทธิ</span>
                        <span>฿{total}</span>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/payment", {
                                state: { addressId: selectedAddressId },
                            })
                        }
                        disabled={!selectedAddressId || items.length === 0}
                        className="w-full py-4 bg-[#1C1C1A] text-white font-bold rounded-xl disabled:bg-gray-300 transition-colors"
                    >
                        {selectedAddressId
                            ? "ไปหน้าชำระเงิน"
                            : "กรุณาเลือกที่อยู่จัดส่ง"}
                    </button>
                </div>
            </div>
        </div>
    );
}
