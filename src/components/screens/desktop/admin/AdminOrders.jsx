import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getAdminOrders } from '@/services/admin'
import { payOrder, cancelOrder } from '@/services/order'

const statusColor = {
    "Pending":     "bg-yellow-100 text-yellow-700",
    "Paid":        "bg-green-100 text-green-700",
    "On delivery": "bg-blue-100 text-blue-700",
    "Delivered":   "bg-emerald-100 text-emerald-700",
    "Cancelled":   "bg-red-100 text-red-700",
}

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expandedId, setExpandedId] = useState(null)
    const [refetchKey, setRefetchKey] = useState(0)

    useEffect(() => {
        let active = true
        async function load() {
            try {
                const res = await getAdminOrders()
                if (active) setOrders(res.data ?? [])
            } catch {
                if (active) setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
            } finally {
                if (active) setLoading(false)
            }
        }
        load()
        return () => { active = false }
    }, [refetchKey])

    const handleToggle = (id) => {
        setExpandedId(prev => prev === id ? null : id)
    }

    const handlePay = async (order) => {
        if (!window.confirm(`ยืนยันการชำระเงินสำหรับออเดอร์ ${order._id}?`)) return
        try {
            await payOrder(order._id)
            setRefetchKey(k => k + 1)
        } catch {
            alert('เกิดข้อผิดพลาด ไม่สามารถยืนยันชำระเงินได้')
        }
    }

    const handleCancel = async (order) => {
        if (!window.confirm(`ยืนยันการยกเลิกออเดอร์ ${order._id}?`)) return
        try {
            await cancelOrder(order._id)
            setRefetchKey(k => k + 1)
        } catch {
            alert('เกิดข้อผิดพลาด ไม่สามารถยกเลิกออเดอร์ได้')
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Orders</h1>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายการออเดอร์ {!loading && `(${orders.length})`}
                    </h2>
                </div>

                {!loading && orders.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-[#8A8780]">
                        ยังไม่มีออเดอร์
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-[#F8F6F2] text-[#8A8780]">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium w-8"></th>
                                <th className="text-left px-6 py-3 font-medium">Order ID</th>
                                <th className="text-left px-6 py-3 font-medium">ลูกค้า</th>
                                <th className="text-left px-6 py-3 font-medium">ยอดรวม</th>
                                <th className="text-left px-6 py-3 font-medium">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <>
                                    <tr
                                        key={order._id}
                                        className="border-t border-[#DDD9D0] cursor-pointer hover:bg-[#F8F6F2] transition-colors"
                                        onClick={() => handleToggle(order._id)}
                                    >
                                        <td className="px-6 py-4 text-[#8A8780]">
                                            {expandedId === order._id
                                                ? <ChevronUp size={16} />
                                                : <ChevronDown size={16} />}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-[#5B8C5A]">{order._id}</td>
                                        <td className="px-6 py-4 text-[#1C1C1A]">{order.userId?.username ?? '—'}</td>
                                        <td className="px-6 py-4 text-[#1C1C1A]">฿{order.total?.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>

                                    {expandedId === order._id && (
                                        <tr key={`${order._id}-detail`} className="bg-[#F8F6F2]">
                                            <td colSpan={5} className="px-10 py-5">
                                                <div className="flex gap-10">
                                                    {/* Items */}
                                                    <div className="flex-1">
                                                        <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wide mb-2">รายการสินค้า</p>
                                                        <table className="w-full text-sm">
                                                            <thead>
                                                                <tr className="text-[#8A8780] text-xs">
                                                                    <th className="text-left pb-1 font-medium">ชื่อสินค้า</th>
                                                                    <th className="text-right pb-1 font-medium">ราคา</th>
                                                                    <th className="text-right pb-1 font-medium">จำนวน</th>
                                                                    <th className="text-right pb-1 font-medium">รวม</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.items?.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td className="py-1 text-[#1C1C1A]">{item.productname}</td>
                                                                        <td className="py-1 text-right text-[#1C1C1A]">฿{item.price?.toLocaleString()}</td>
                                                                        <td className="py-1 text-right text-[#1C1C1A]">x{item.quantity}</td>
                                                                        <td className="py-1 text-right text-[#1C1C1A]">฿{(item.price * item.quantity)?.toLocaleString()}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        <div className="mt-3 pt-3 border-t border-[#DDD9D0] text-xs space-y-1 text-[#1C1C1A]">
                                                            <div className="flex justify-between">
                                                                <span className="text-[#8A8780]">ยอดสินค้า</span>
                                                                <span>฿{order.subtotal?.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-[#8A8780]">ค่าจัดส่ง</span>
                                                                <span>฿{order.shippingFee?.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between font-semibold text-sm">
                                                                <span>ยอดรวม</span>
                                                                <span>฿{order.total?.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Delivery + Payment */}
                                                    <div className="w-56 shrink-0 space-y-4">
                                                        <div>
                                                            <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wide mb-1">ที่อยู่จัดส่ง</p>
                                                            <p className="text-sm text-[#1C1C1A]">{order.deliveryAddress?.recieveName}</p>
                                                            <p className="text-sm text-[#1C1C1A]">{order.deliveryAddress?.recieveAddress}</p>
                                                            <p className="text-sm text-[#1C1C1A]">{order.deliveryAddress?.recieveTel}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wide mb-1">ช่องทางชำระเงิน</p>
                                                            <p className="text-sm text-[#1C1C1A]">{order.paymentMethod}</p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="w-40 shrink-0 flex flex-col gap-2 justify-start pt-5">
                                                        {order.status === 'Pending' && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handlePay(order) }}
                                                                className="px-4 py-2 rounded-lg bg-[#5B8C5A] text-white text-xs font-medium hover:bg-[#4a7549] transition-colors"
                                                            >
                                                                ยืนยันชำระเงิน
                                                            </button>
                                                        )}
                                                        {(order.status === 'Pending' || order.status === 'Paid') && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleCancel(order) }}
                                                                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                                                            >
                                                                ยกเลิกออเดอร์
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
