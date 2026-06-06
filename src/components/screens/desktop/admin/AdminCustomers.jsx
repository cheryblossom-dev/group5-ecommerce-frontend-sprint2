import { useState, useEffect } from 'react'
import { getAllUsers, deleteUser, updateUser } from '@/services/admin'

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [editTarget, setEditTarget] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsers()
                setCustomers(res.data ?? [])
            } catch {
                setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const openEdit = (customer) => {
        setEditTarget(customer)
        setEditForm({
            username: customer.username,
            email: customer.email,
            tel: customer.tel,
            role: customer.role,
        })
        setEditError(null)
    }

    const closeEdit = () => {
        setEditTarget(null)
        setEditError(null)
    }

    const handleEditSave = async (e) => {
        e.preventDefault()
        setEditLoading(true)
        setEditError(null)
        try {
            const res = await updateUser(editTarget._id, editForm)
            setCustomers((prev) =>
                prev.map((c) => (c._id === editTarget._id ? { ...c, ...res.data } : c))
            )
            closeEdit()
        } catch (err) {
            setEditError(err.message)
        } finally {
            setEditLoading(false)
        }
    }

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
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Users</h1>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายชื่อผู้ใช้ {!loading && `(${customers.length})`}
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">#</th>
                            <th className="text-left px-6 py-3 font-medium">ชื่อผู้ใช้</th>
                            <th className="text-left px-6 py-3 font-medium">อีเมล</th>
                            <th className="text-left px-6 py-3 font-medium">เบอร์โทร</th>
                            <th className="text-left px-6 py-3 font-medium">Role</th>
                            <th className="text-left px-6 py-3 font-medium">สมัครเมื่อ</th>
                            <th className="px-6 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    กำลังโหลด...
                                </td>
                            </tr>
                        ) : customers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    ยังไม่มีลูกค้า
                                </td>
                            </tr>
                        ) : customers.map((customer, index) => (
                            <tr key={customer._id} className="border-t border-[#DDD9D0]">
                                <td className="px-6 py-4 text-[#8A8780]">{index + 1}</td>
                                <td className="px-6 py-4 text-[#1C1C1A] font-medium">{customer.username}</td>
                                <td className="px-6 py-4 text-[#8A8780]">{customer.email}</td>
                                <td className="px-6 py-4 text-[#1C1C1A]">{customer.tel}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                        customer.role === 'admin'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {customer.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[#8A8780]">
                                    {customer.createdAt ? customer.createdAt.slice(0, 10) : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => openEdit(customer)}
                                            className="text-xs text-[#5B8C5A] hover:text-[#4a7549] font-medium transition-colors"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(customer._id, customer.username)}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
                        <h3 className="text-base font-semibold text-[#1C1C1A] mb-5">
                            แก้ไขข้อมูล — {editTarget.username}
                        </h3>

                        <form onSubmit={handleEditSave} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">ชื่อผู้ใช้</label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm((p) => ({ ...p, username: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">อีเมล</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">เบอร์โทร</label>
                                <input
                                    type="text"
                                    value={editForm.tel}
                                    onChange={(e) => setEditForm((p) => ({ ...p, tel: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            {editError && (
                                <p className="text-sm text-red-500">{editError}</p>
                            )}

                            <div className="flex justify-end gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeEdit}
                                    className="px-4 py-2 text-sm text-[#8A8780] hover:text-[#1C1C1A] transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-5 py-2 bg-[#5B8C5A] text-white text-sm font-medium rounded-lg hover:bg-[#4a7549] disabled:opacity-50 transition-colors"
                                >
                                    {editLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
