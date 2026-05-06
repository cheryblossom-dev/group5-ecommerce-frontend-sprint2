import { mockCustomers } from '@/data/adminMockData'

export default function AdminCustomers() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Customers</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#DDD9D0]">
          <h2 className="text-base font-semibold text-[#1C1C1A]">
            รายชื่อลูกค้า ({mockCustomers.length})
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#F8F6F2] text-[#8A8780]">
            <tr>
              <th className="text-left px-6 py-3 font-medium">ID</th>
              <th className="text-left px-6 py-3 font-medium">ชื่อ</th>
              <th className="text-left px-6 py-3 font-medium">อีเมล</th>
              <th className="text-left px-6 py-3 font-medium">จำนวนออเดอร์</th>
              <th className="text-left px-6 py-3 font-medium">ยอดซื้อรวม</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-t border-[#DDD9D0]">
                <td className="px-6 py-4 font-medium text-[#5B8C5A]">{customer.id}</td>
                <td className="px-6 py-4 text-[#1C1C1A]">{customer.name}</td>
                <td className="px-6 py-4 text-[#8A8780]">{customer.email}</td>
                <td className="px-6 py-4 text-[#1C1C1A]">{customer.orders}</td>
                <td className="px-6 py-4 text-[#1C1C1A]">฿{customer.totalSpent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
