import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/useCart";
import { useEffect } from "react";

const DTrackingScreen = () => {
    const navigate = useNavigate();
    const { refetchCart } = useCart(); // ถ้าใน Context มีฟังก์ชันโหลดตะกร้าใหม่ ให้ดึงมาใช้

    // เมื่อเข้ามาหน้านี้ (แปลว่าจ่ายเงิน/ตัดสต๊อกสำเร็จแล้ว)
    // ให้สั่งหน้าบ้านรีเซ็ตค่าใน Context ตะกร้าให้ว่างตาม DB
    useEffect(() => {
        if (refetchCart) refetchCart();
    }, [refetchCart]);

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
                    ระบบได้รับคำสั่งซื้อและตัดสต๊อกเรียบร้อยแล้ว
                    <br />
                    (ข้อมูลถูกบันทึกลง Database สำเร็จ)
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate("/catalog")}
                        className="w-full py-4 bg-[#5B8C5A] hover:bg-[#4a7249] text-white font-bold rounded-xl transition-colors"
                    >
                        กลับไปเลือกซื้อสินค้าเพิ่ม
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DTrackingScreen;
