import { mockOrders } from '@/data/adminMockData'

const statusColor = {
    Pending:   'bg-yellow-100 text-yellow-700',
    Shipped:   'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
}

export default function AdminOrders() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายการออเดอร์ ({mockOrders.length})
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">Order ID</th>
                            <th className="text-left px-6 py-3 font-medium">ลูกค้า</th>
                            <th className="text-left px-6 py-3 font-medium">ยอดรวม</th>
                            <th className="text-left px-6 py-3 font-medium">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map((order) => (
                            <tr key={order.id} className="border-t border-[#DDD9D0]">
                                <td className="px-6 py-4 font-medium text-[#5B8C5A]">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 text-[#1C1C1A]">
                                    {order.customer}
                                </td>
                                <td className="px-6 py-4 text-[#1C1C1A]">
                                    ฿{order.total}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
