import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { updateMe, changePassword, getAddresses, createAddress, updateAddress, deleteAddress } from '@/services/user'

const EMPTY_ADDRESS_FORM = { label: '', recieveName: '', recieveAddress: '', recieveTel: '', isDefault: false }
const MAX_ADDRESSES = 5

export default function DProfileScreen() {
    const { user, updateUser } = useAuth()

    const [profileForm, setProfileForm] = useState({
        username: user?.username ?? '',
        tel: user?.tel ?? '',
    })
    const [profileMsg, setProfileMsg] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [passwordMsg, setPasswordMsg] = useState(null)
    const [passwordLoading, setPasswordLoading] = useState(false)

    const [addresses, setAddresses] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM)
    const [addressMsg, setAddressMsg] = useState(null)
    const [addressSubmitting, setAddressSubmitting] = useState(false)
    const [deleteConfirmId, setDeleteConfirmId] = useState(null)

    useEffect(() => {
        getAddresses()
            .then((res) => setAddresses(res.data))
            .catch(() => {})
    }, [])

    const showMsg = (setter, msg) => {
        setter(msg)
        setTimeout(() => setter(null), 3000)
    }

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setProfileLoading(true)
        try {
            const res = await updateMe(profileForm)
            updateUser({ username: res.data.username, tel: res.data.tel })
            showMsg(setProfileMsg, { type: 'success', text: 'บันทึกข้อมูลสำเร็จ' })
        } catch (err) {
            showMsg(setProfileMsg, { type: 'error', text: err.message })
        } finally {
            setProfileLoading(false)
        }
    }

    const handlePasswordSave = async (e) => {
        e.preventDefault()
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showMsg(setPasswordMsg, { type: 'error', text: 'รหัสผ่านใหม่ไม่ตรงกัน' })
            return
        }
        setPasswordLoading(true)
        try {
            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            })
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
            showMsg(setPasswordMsg, { type: 'success', text: 'เปลี่ยนรหัสผ่านสำเร็จ' })
        } catch (err) {
            showMsg(setPasswordMsg, { type: 'error', text: err.message })
        } finally {
            setPasswordLoading(false)
        }
    }

    const openAddForm = () => {
        setEditingId(null)
        setAddressForm(EMPTY_ADDRESS_FORM)
        setShowForm(true)
    }

    const openEditForm = (addr) => {
        setEditingId(addr._id)
        setAddressForm({
            label: addr.label,
            recieveName: addr.recieveName,
            recieveAddress: addr.recieveAddress,
            recieveTel: addr.recieveTel,
            isDefault: addr.isDefault,
        })
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingId(null)
        setAddressForm(EMPTY_ADDRESS_FORM)
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault()
        setAddressSubmitting(true)
        try {
            if (editingId) {
                const res = await updateAddress(editingId, addressForm)
                setAddresses(res.data)
            } else {
                const res = await createAddress(addressForm)
                setAddresses(res.data)
            }
            showMsg(setAddressMsg, { type: 'success', text: editingId ? 'แก้ไขที่อยู่สำเร็จ' : 'เพิ่มที่อยู่สำเร็จ' })
            closeForm()
        } catch (err) {
            showMsg(setAddressMsg, { type: 'error', text: err.message })
        } finally {
            setAddressSubmitting(false)
        }
    }

    const handleSetDefault = async (addr) => {
        try {
            const res = await updateAddress(addr._id, { isDefault: true })
            setAddresses(res.data)
        } catch (err) {
            showMsg(setAddressMsg, { type: 'error', text: err.message })
        }
    }

    const handleDeleteConfirm = async (id) => {
        try {
            await deleteAddress(id)
            setAddresses((prev) => prev.filter((a) => a._id !== id))
            setDeleteConfirmId(null)
            showMsg(setAddressMsg, { type: 'success', text: 'ลบที่อยู่สำเร็จ' })
        } catch (err) {
            showMsg(setAddressMsg, { type: 'error', text: err.message })
        }
    }

    const inputClass =
        'w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30'

    return (
        <div className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-8">โปรไฟล์ของฉัน</h1>

            {/* Section 1: ข้อมูลส่วนตัว */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-base font-semibold text-[#1C1C1A] mb-5">ข้อมูลส่วนตัว</h2>
                <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">อีเมล</label>
                        <input
                            type="text"
                            value={user?.email ?? ''}
                            disabled
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] bg-[#F8F6F2] text-sm text-[#8A8780] cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">ชื่อผู้ใช้</label>
                        <input
                            type="text"
                            value={profileForm.username}
                            onChange={(e) => setProfileForm((p) => ({ ...p, username: e.target.value }))}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">เบอร์โทร</label>
                        <input
                            type="text"
                            value={profileForm.tel}
                            onChange={(e) => setProfileForm((p) => ({ ...p, tel: e.target.value }))}
                            className={inputClass}
                        />
                    </div>

                    {profileMsg && (
                        <p className={`text-sm ${profileMsg.type === 'success' ? 'text-[#5B8C5A]' : 'text-red-500'}`}>
                            {profileMsg.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={profileLoading}
                        className="self-end px-5 py-2 bg-[#5B8C5A] text-white text-sm font-medium rounded-lg hover:bg-[#4a7549] disabled:opacity-50 transition-colors"
                    >
                        {profileLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                </form>
            </div>

            {/* Section 2: ที่อยู่ */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">ที่อยู่ของฉัน</h2>
                    <button
                        onClick={openAddForm}
                        disabled={addresses.length >= MAX_ADDRESSES || showForm}
                        className="text-sm text-[#5B8C5A] font-medium hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                    >
                        + เพิ่มที่อยู่
                    </button>
                </div>

                {addresses.length === 0 && !showForm && (
                    <p className="text-sm text-[#8A8780] text-center py-4">ยังไม่มีที่อยู่</p>
                )}

                <div className="flex flex-col gap-3">
                    {addresses.map((addr) => (
                        <div key={addr._id} className="border border-[#DDD9D0] rounded-lg p-4">
                            {deleteConfirmId === addr._id ? (
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm text-[#1C1C1A]">
                                        ยืนยันลบที่อยู่ <span className="font-medium">"{addr.label}"</span>?
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => setDeleteConfirmId(null)}
                                            className="px-3 py-1.5 text-sm border border-[#DDD9D0] rounded-lg hover:bg-[#F8F6F2] transition-colors"
                                        >
                                            ยกเลิก
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConfirm(addr._id)}
                                            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-medium text-[#1C1C1A]">{addr.label}</span>
                                            {addr.isDefault && (
                                                <span className="text-xs px-2 py-0.5 bg-[#5B8C5A]/10 text-[#5B8C5A] rounded-full font-medium">
                                                    หลัก
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            <button
                                                onClick={() => openEditForm(addr)}
                                                className="text-xs text-[#5B8C5A] hover:underline"
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(addr._id)}
                                                className="text-xs text-red-500 hover:underline"
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#1C1C1A]">
                                        {addr.recieveName} · {addr.recieveTel}
                                    </p>
                                    <p className="text-sm text-[#8A8780] mt-0.5">{addr.recieveAddress}</p>
                                    {!addr.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(addr)}
                                            className="mt-2 text-xs text-[#8A8780] hover:text-[#5B8C5A] hover:underline transition-colors"
                                        >
                                            ตั้งเป็นที่อยู่หลัก
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Inline form */}
                {showForm && (
                    <div className="mt-4 border border-[#DDD9D0] rounded-lg p-4 bg-[#F8F6F2]">
                        <h3 className="text-sm font-semibold text-[#1C1C1A] mb-4">
                            {editingId ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่'}
                        </h3>
                        <form onSubmit={handleAddressSubmit} className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">ชื่อที่อยู่</label>
                                <input
                                    type="text"
                                    placeholder="เช่น บ้าน, ที่ทำงาน"
                                    value={addressForm.label}
                                    onChange={(e) => setAddressForm((p) => ({ ...p, label: e.target.value }))}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">ชื่อผู้รับ</label>
                                <input
                                    type="text"
                                    value={addressForm.recieveName}
                                    onChange={(e) => setAddressForm((p) => ({ ...p, recieveName: e.target.value }))}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">ที่อยู่</label>
                                <textarea
                                    value={addressForm.recieveAddress}
                                    onChange={(e) => setAddressForm((p) => ({ ...p, recieveAddress: e.target.value }))}
                                    required
                                    rows={2}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8A8780] mb-1">เบอร์โทร</label>
                                <input
                                    type="text"
                                    value={addressForm.recieveTel}
                                    onChange={(e) => setAddressForm((p) => ({ ...p, recieveTel: e.target.value }))}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-[#1C1C1A] cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={addressForm.isDefault}
                                    onChange={(e) => setAddressForm((p) => ({ ...p, isDefault: e.target.checked }))}
                                    className="accent-[#5B8C5A] w-4 h-4"
                                />
                                ตั้งเป็นที่อยู่หลัก
                            </label>
                            <div className="flex gap-2 justify-end pt-1">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-4 py-2 text-sm border border-[#DDD9D0] rounded-lg hover:bg-white transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    disabled={addressSubmitting}
                                    className="px-4 py-2 text-sm bg-[#5B8C5A] text-white rounded-lg hover:bg-[#4a7549] disabled:opacity-50 transition-colors"
                                >
                                    {addressSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {addressMsg && (
                    <p className={`text-sm mt-3 ${addressMsg.type === 'success' ? 'text-[#5B8C5A]' : 'text-red-500'}`}>
                        {addressMsg.text}
                    </p>
                )}

                {addresses.length >= MAX_ADDRESSES && !showForm && (
                    <p className="text-xs text-[#8A8780] text-center mt-3">เพิ่มได้สูงสุด {MAX_ADDRESSES} ที่อยู่</p>
                )}
            </div>

            {/* Section 3: เปลี่ยนรหัสผ่าน */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold text-[#1C1C1A] mb-5">เปลี่ยนรหัสผ่าน</h2>
                <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">รหัสผ่านปัจจุบัน</label>
                        <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">รหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                            className={inputClass}
                        />
                    </div>

                    {passwordMsg && (
                        <p className={`text-sm ${passwordMsg.type === 'success' ? 'text-[#5B8C5A]' : 'text-red-500'}`}>
                            {passwordMsg.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={passwordLoading}
                        className="self-end px-5 py-2 bg-[#5B8C5A] text-white text-sm font-medium rounded-lg hover:bg-[#4a7549] disabled:opacity-50 transition-colors"
                    >
                        {passwordLoading ? 'กำลังบันทึก...' : 'เปลี่ยนรหัสผ่าน'}
                    </button>
                </form>
            </div>
        </div>
    )
}
