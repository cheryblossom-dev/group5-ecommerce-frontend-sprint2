import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getMyOrders } from "@/services/order";

const STATUS_CONFIG = {
    Pending: { label: "รอดำเนินการ", color: "bg-yellow-100 text-yellow-700", Icon: Clock },
    Paid: { label: "ชำระแล้ว", color: "bg-green-100 text-green-700", Icon: CheckCircle2 },
    Canceled: { label: "ยกเลิกแล้ว", color: "bg-red-100 text-red-600", Icon: XCircle },
};

const DTrackingScreen = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getMyOrders()
            .then((res) => setOrders(res.data || []))
            .catch(() => setError("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F6F2]">
                <p className="text-[#8A8780] font-medium">กำลังโหลด...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F6F2]">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F6F2] px-4">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <ShoppingBag size={64} className="text-[#DDD9D0]" />
                    </div>
                    <h2 className="text-xl font-black text-[#1C1C1A] mb-2">ยังไม่มีคำสั่งซื้อ</h2>
                    <p className="text-[#8A8780] font-medium mb-6">
                        เริ่มสั่งซื้อสินค้าเพื่อติดตามที่นี่
                    </p>
                    <button
                        onClick={() => navigate("/catalog")}
                        className="px-8 py-3 bg-[#5B8C5A] hover:bg-[#4a7249] text-white font-bold rounded-xl transition-colors"
                    >
                        เริ่มช้อปปิ้ง
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-[#F8F6F2] px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-black text-[#1C1C1A] mb-6">ติดตามคำสั่งซื้อ</h1>
                <div className="space-y-4">
                    {orders.map((order) => {
                        const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
                        const { Icon } = status;
                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-[#DDD9D0] p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-[#8A8780] font-medium">
                                            {new Date(order.createdAt).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p className="text-xs text-[#b4b0a5] mt-0.5">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </p>
                                    </div>
                                    <span
                                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${status.color}`}
                                    >
                                        <Icon size={12} />
                                        {status.label}
                                    </span>
                                </div>

                                <div className="space-y-1 mb-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-[#1C1C1A] font-medium">
                                                {item.productname}
                                            </span>
                                            <span className="text-[#8A8780]">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[#F0EDE8] pt-4 flex items-center justify-between">
                                    <span className="text-xs text-[#8A8780] font-medium">
                                        {order.paymentMethod === "Bank transfer"
                                            ? "โอนเงินผ่านธนาคาร"
                                            : "เก็บเงินปลายทาง"}
                                    </span>
                                    <span className="font-black text-[#1C1C1A]">
                                        ฿{order.total?.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DTrackingScreen;
