import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/useCart";
import { useEffect } from "react";

const DPaymentSuccessScreen = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F6F2] px-4">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#DDD9D0] max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle2 size={80} className="text-[#5B8C5A]" />
                </div>

                <h1 className="text-2xl font-black text-[#1C1C1A] mb-2">
                    สั่งซื้อสำเร็จ!
                </h1>

                <p className="text-[#8A8780] mb-8 font-medium">
                    ระบบได้รับคำสั่งซื้อเรียบร้อยแล้ว
                    <br />
                    กำลังรอการยืนยันจากทีมงาน
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate("/tracking")}
                        className="w-full py-4 bg-[#5B8C5A] hover:bg-[#4a7249] text-white font-bold rounded-xl transition-colors"
                    >
                        ติดตามคำสั่งซื้อ
                    </button>
                    <button
                        onClick={() => navigate("/catalog")}
                        className="w-full py-4 bg-white hover:bg-[#f5f2ea] text-[#1C1C1A] font-bold rounded-xl border border-[#DDD9D0] transition-colors"
                    >
                        กลับไปเลือกซื้อสินค้าเพิ่ม
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DPaymentSuccessScreen;
