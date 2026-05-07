import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, BookA } from 'lucide-react'

const DLoginScreen = () => {
    const navigate = useNavigate()

    // 1. State สำหรับเก็บค่าจาก Input
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // 2. State สำหรับเก็บข้อความ Error (Validation)
    const [errors, setErrors] = useState({})

    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าใน Input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        // ล้าง Error ของฟิลด์นั้นๆ เมื่อผู้ใช้เริ่มพิมพ์ใหม่
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    // 3. ฟังก์ชัน Validation เบื้องต้นก่อนส่งไป Backend
    const validateForm = () => {
        let newErrors = {}
        if (!formData.email) {
            newErrors.email = 'กรุณากรอกอีเมล'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
        }

        if (!formData.password) {
            newErrors.password = 'กรุณากรอกรหัสผ่าน'
        } else if (formData.password.length < 6) {
            newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('ข้อมูลพร้อมส่งไป BE/DB:', formData)
            // เดี๋ยวจุดนี้เราจะเปลี่ยนมาใช้ fetch() หรือ axios เพื่อต่อกับ MongoDB
            alert('กำลังเข้าสู่ระบบ...')
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-6 font-sans">
            <div className="max-w-281.5 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Brand Info */}
                <div className="hidden md:flex flex-col space-y-8">
                    <div className="w-16 h-16 bg-[#EAF2EA] rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#d6d2c7]">
                        🥗
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-[#202020] leading-tight mb-4">
                            สุขภาพดี
                            <br />
                            เริ่มจากทุกมื้อ
                        </h1>
                        <p className="text-[#8e8a83] text-lg max-w-sm leading-relaxed">
                            อาหาร clean food ส่งตรงถึงบ้านคุณ สด สะอาด
                            คำนวณแคลอรี่ให้ครบ
                        </p>
                    </div>
                    {/* Mini Category Icons */}
                    <div className="flex gap-4">
                        {['🍗', '🥗', '🥤', '🍱'].map((icon, i) => (
                            <div
                                key={i}
                                className="w-12 h-12 bg-white border border-[#e5dfd3] rounded-xl flex items-center justify-center text-xl shadow-xs"
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Login Form Card */}
                <div className="bg-white p-10 rounded-lg shadow-xl shadow-gray-200/50 border border-[#e5dfd3] max-w-120 w-full mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-[#202020] mb-2">
                            เข้าสู่ระบบ
                        </h2>
                        <p className="text-[#8e8a83] text-sm">
                            ยินดีต้อนรับกลับมา
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#6d675f] uppercase tracking-wider">
                                อีเมล
                            </label>
                            <div
                                className={`relative flex items-center border rounded-lg transition-all ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#e5dfd3] focus-within:border-[#5B8C5A]'}`}
                            >
                                <Mail
                                    className="absolute left-4 text-[#9c978f]"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="w-full py-3.5 pl-12 pr-4 bg-transparent outline-none text-sm text-[#202020]"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] text-red-500 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between">
                                <label className="text-xs font-bold text-[#6d675f] uppercase tracking-wider">
                                    รหัสผ่าน
                                </label>
                                <button
                                    type="button"
                                    className="text-[11px] font-bold text-[#5B8C5A] hover:underline"
                                >
                                    ลืมรหัสผ่าน?
                                </button>
                            </div>
                            <div
                                className={`relative flex items-center border rounded-lg transition-all ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-[#e5dfd3] focus-within:border-[#5B8C5A]'}`}
                            >
                                <Lock
                                    className="absolute left-4 text-[#9c978f]"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••"
                                    className="w-full py-3.5 pl-12 pr-4 bg-transparent outline-none text-sm text-[#202020]"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-[11px] text-red-500 font-medium">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#5c8254] hover:bg-[#4a6b43] text-white rounded-lg font-bold transition-all active:scale-[0.98] mt-2 shadow-lg shadow-green-900/10"
                        >
                            เข้าสู่ระบบ
                        </button>

                        <div className="relative py-4 flex items-center">
                            <div className="grow border-t border-[#eee7db]"></div>
                            <span className="shrink mx-4 text-[11px] text-[#aaa295] font-bold uppercase tracking-widest">
                                หรือ
                            </span>
                            <div className="grow border-t border-[#eee7db]"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 bg-[#f5f2ea] hover:bg-[#ece8df] border border-[#e5dfd3] rounded-lg text-xs font-bold text-[#5b5750] transition-colors"
                            >
                                <LogOut size={16} /> Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 bg-[#f5f2ea] hover:bg-[#ece8df] border border-[#e5dfd3] rounded-lg text-xs font-bold text-[#5b5750] transition-colors"
                            >
                                <BookA size={16} /> Facebook
                            </button>
                        </div>

                        <p className="text-center text-[13px] text-[#8e8a83] pt-4">
                            ยังไม่มีบัญชี?{' '}
                            <button
                                type="button"
                                className="text-[#5B8C5A] font-bold hover:underline"
                                onClick={() => navigate('/register')}
                            >
                                สมัครสมาชิก
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DLoginScreen
