import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { updateMe, changePassword } from '@/services/user'

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
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">เบอร์โทร</label>
                        <input
                            type="text"
                            value={profileForm.tel}
                            onChange={(e) => setProfileForm((p) => ({ ...p, tel: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
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

            {/* Section 2: เปลี่ยนรหัสผ่าน */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold text-[#1C1C1A] mb-5">เปลี่ยนรหัสผ่าน</h2>
                <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">รหัสผ่านปัจจุบัน</label>
                        <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">รหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#8A8780] mb-1">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-[#DDD9D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30"
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
