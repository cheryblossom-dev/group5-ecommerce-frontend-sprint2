import { useState, useEffect } from 'react'
import { getAllUsers, deleteUser } from '@/services/admin'

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsers()
                const users = (res.data ?? []).filter((u) => u.role === 'user')
                setCustomers(users)
            } catch (err) {
                setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id, username) => {
        if (!window.confirm(`ลบลูกค้า "${username}" ออกจากระบบ?`)) return
        try {
            await deleteUser(id)
            setCustomers((prev) => prev.filter((c) => c._id !== id))
        } catch {
            setError('ลบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Customers</h1>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายชื่อลูกค้า {!loading && `(${customers.length})`}
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">#</th>
                            <th className="text-left px-6 py-3 font-medium">ชื่อผู้ใช้</th>
                            <th className="text-left px-6 py-3 font-medium">อีเมล</th>
                            <th className="text-left px-6 py-3 font-medium">เบอร์โทร</th>
                            <th className="text-left px-6 py-3 font-medium">สมัครเมื่อ</th>
                            <th className="px-6 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    กำลังโหลด...
                                </td>
                            </tr>
                        ) : customers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    ยังไม่มีลูกค้า
                                </td>
                            </tr>
                        ) : customers.map((customer, index) => (
                            <tr key={customer._id} className="border-t border-[#DDD9D0]">
                                <td className="px-6 py-4 text-[#8A8780]">{index + 1}</td>
                                <td className="px-6 py-4 text-[#1C1C1A] font-medium">{customer.username}</td>
                                <td className="px-6 py-4 text-[#8A8780]">{customer.email}</td>
                                <td className="px-6 py-4 text-[#1C1C1A]">{customer.tel}</td>
                                <td className="px-6 py-4 text-[#8A8780]">
                                    {customer.createdAt ? customer.createdAt.slice(0, 10) : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(customer._id, customer.username)}
                                        className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
