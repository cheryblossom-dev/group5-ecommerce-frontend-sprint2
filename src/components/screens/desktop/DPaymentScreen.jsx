import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "@/services/order";
import { useCart } from "@/context/useCart";

const DPaymentScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { total, clearCart } = useCart();

    const addressId = location.state?.addressId;
    const [selectedMethod, setSelectedMethod] = useState("Bank transfer");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!addressId) {
            navigate("/cart");
        }
    }, [addressId, navigate]);

    const handleConfirmPayment = async () => {
        if (!addressId || !selectedMethod) return;

        setIsProcessing(true);
        setErrorMsg("");

        try {
            // ยิง API สร้างออเดอร์ ตัดสต๊อก และเคลียร์ตะกร้าที่หลังบ้าน
            await createOrder({
                addressId,
                paymentMethod: selectedMethod,
            });

            //done
            await clearCart();
            navigate("/tracking");
        } catch (error) {
            console.error("Order creation failed:", error);
            const message =
                error.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ";

            // alert now we're only have xx ea
            alert(`ขออภัยครับ: ${message}`);
            navigate("/cart");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!addressId) return null;

    return (
        <div className="min-h-screen bg-[#F8F6F2] font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-[#DDD9D0] shadow-sm">
                <h1 className="text-xl font-bold text-[#1C1C1A] mb-6 text-center">
                    ยืนยันการชำระเงิน
                </h1>

                {errorMsg && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 font-bold text-center">
                        {errorMsg}
                    </div>
                )}

                <div className="mb-8 text-center">
                    <p className="text-sm text-[#8A8780] mb-1 font-bold">
                        ยอดชำระสุทธิ
                    </p>
                    <p className="text-4xl font-black text-[#5B8C5A]">
                        ฿{total?.toLocaleString()}
                    </p>
                </div>

                <div className="space-y-3 mb-8">
                    <label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                            selectedMethod === "Bank transfer"
                                ? "border-[#5B8C5A] bg-[#EAF2EA]"
                                : "border-[#DDD9D0] bg-white hover:border-[#b4b0a5]"
                        }`}
                    >
                        <input
                            type="radio"
                            value="Bank transfer"
                            checked={selectedMethod === "Bank transfer"}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-4 h-4 accent-[#5B8C5A]"
                        />
                        <span className="font-bold text-[#1C1C1A]">
                            โอนเงินผ่านธนาคาร
                        </span>
                    </label>

                    <label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                            selectedMethod === "Cash on Delivery"
                                ? "border-[#5B8C5A] bg-[#EAF2EA]"
                                : "border-[#DDD9D0] bg-white hover:border-[#b4b0a5]"
                        }`}
                    >
                        <input
                            type="radio"
                            value="Cash on Delivery"
                            checked={selectedMethod === "Cash on Delivery"}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-4 h-4 accent-[#5B8C5A]"
                        />
                        <span className="font-bold text-[#1C1C1A]">
                            เก็บเงินปลายทาง (COD)
                        </span>
                    </label>
                </div>

                <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="w-full h-14 rounded-xl bg-[#1C1C1A] hover:bg-[#5B8C5A] text-white font-bold text-lg disabled:opacity-50 transition-colors shadow-sm"
                >
                    {isProcessing ? "กำลังประมวลผล..." : "ยืนยันการสั่งซื้อ"}
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="w-full mt-4 text-sm text-[#8A8780] hover:text-[#1C1C1A] font-bold transition-colors"
                >
                    กลับไปหน้าตะกร้า
                </button>
            </div>
        </div>
    );
};

export default DPaymentScreen;
