import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { register as registerApi } from "@/services/auth"; // ดึง API register มาใช้

const DRegisterScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        tel: "",
        address: "",
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
        if (apiError) setApiError("");
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.username) newErrors.username = "กรุณากรอกชื่อผู้ใช้";

        if (!formData.email) {
            newErrors.email = "กรุณากรอกอีเมล";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
        }

        if (!formData.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน";
        } else if (formData.password.length < 6) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }

        if (!formData.tel) newErrors.tel = "กรุณากรอกเบอร์โทรศัพท์";

        if (!formData.address)
            newErrors.address = "กรุณากรอกที่อยู่สำหรับจัดส่ง";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            setApiError("");

            try {
                // Address เป็น Array ตรงกับ DB)
                const payload = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    tel: formData.tel,
                    role: "user",
                    address: [
                        {
                            label: "ที่อยู่หลัก",
                            recieveName: formData.username,
                            recieveAddress: formData.address,
                            recieveTel: formData.tel,
                            isDefault: true,
                        },
                    ],
                };

                await registerApi(payload);

                alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
                navigate("/login");
            } catch (error) {
                console.error("Register Failed:", error);
                setApiError(
                    error.message ||
                        "ไม่สามารถสมัครสมาชิกได้ หรืออีเมลนี้มีในระบบแล้ว",
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

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
                            เริ่มต้นมื้อสุขภาพ
                            <br />
                            ของคุณวันนี้
                        </h1>
                        <p className="text-[#8e8a83] text-lg max-w-sm leading-relaxed">
                            สมัครสมาชิกเพื่อรับโปรโมชั่นพิเศษ และสั่งอาหาร clean
                            food ส่งตรงถึงบ้านคุณ
                        </p>
                    </div>
                    <div className="flex gap-4">
                        {["🥬", "🥑", "🍅", "🥕"].map((icon, i) => (
                            <div
                                key={i}
                                className="w-12 h-12 bg-white border border-[#e5dfd3] rounded-xl flex items-center justify-center text-xl shadow-xs"
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl shadow-gray-200/50 border border-[#e5dfd3] max-w-120 w-full mx-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-[#202020] mb-2">
                            สร้างบัญชีใหม่
                        </h2>
                        <p className="text-[#8e8a83] text-sm">
                            กรอกข้อมูลด้านล่างเพื่อสมัครสมาชิก
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded-lg text-sm font-bold text-center mb-4">
                                ❌ {apiError}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {/* Username */}
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider">
                                    ชื่อผู้ใช้
                                </label>
                                <div
                                    className={`relative flex items-center border rounded-lg transition-all ${errors.username ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                                >
                                    <User
                                        className="absolute left-3 text-[#9c978f]"
                                        size={16}
                                    />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="ชื่อของคุณ"
                                        className="w-full py-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020]"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider">
                                    เบอร์โทรศัพท์
                                </label>
                                <div
                                    className={`relative flex items-center border rounded-lg transition-all ${errors.tel ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                                >
                                    <Phone
                                        className="absolute left-3 text-[#9c978f]"
                                        size={16}
                                    />
                                    <input
                                        type="text"
                                        name="tel"
                                        value={formData.tel}
                                        onChange={handleChange}
                                        placeholder="08X-XXX-XXXX"
                                        className="w-full py-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020]"
                                    />
                                </div>
                                {errors.tel && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        {errors.tel}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider">
                                อีเมล
                            </label>
                            <div
                                className={`relative flex items-center border rounded-lg transition-all ${errors.email ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                            >
                                <Mail
                                    className="absolute left-3 text-[#9c978f]"
                                    size={16}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="w-full py-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020]"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[10px] text-red-500 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password / Confirm Password */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider block">
                                    รหัสผ่าน
                                </label>
                                <div
                                    className={`relative flex items-center border rounded-lg transition-all ${errors.password ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                                >
                                    <Lock
                                        className="absolute left-3 text-[#9c978f]"
                                        size={16}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••"
                                        className="w-full py-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020]"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider block">
                                    ยืนยันรหัสผ่าน
                                </label>
                                <div
                                    className={`relative flex items-center border rounded-lg transition-all ${errors.confirmPassword ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                                >
                                    <Lock
                                        className="absolute left-3 text-[#9c978f]"
                                        size={16}
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••"
                                        className="w-full py-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020]"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#6d675f] uppercase tracking-wider block">
                                ที่อยู่จัดส่ง
                            </label>
                            <div
                                className={`relative flex items-start border rounded-lg transition-all pt-3 ${errors.address ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
                            >
                                <MapPin
                                    className="absolute left-3 text-[#9c978f] top-3.5"
                                    size={16}
                                />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="2"
                                    placeholder="บ้านเลขที่ ซอย ถนน แขวง เขต จังหวัด รหัสไปรษณีย์"
                                    className="w-full pb-3 pl-10 pr-3 bg-transparent outline-none text-sm text-[#202020] resize-none"
                                />
                            </div>
                            {errors.address && (
                                <p className="text-[10px] text-red-500 font-medium">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-lg font-bold transition-all mt-6 shadow-sm
                                ${
                                    isLoading
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-[#5c8254] hover:bg-[#4a6b43] text-white active:scale-[0.98] shadow-lg shadow-green-900/10"
                                }`}
                        >
                            {isLoading ? "กำลังสร้างบัญชี..." : "สมัครสมาชิก"}
                        </button>

                        <p className="text-center text-[13px] text-[#8e8a83] pt-2">
                            มีบัญชีอยู่แล้ว?{" "}
                            <button
                                type="button"
                                className="text-[#5B8C5A] font-bold hover:underline"
                                onClick={() => navigate("/login")}
                            >
                                เข้าสู่ระบบ
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DRegisterScreen;
