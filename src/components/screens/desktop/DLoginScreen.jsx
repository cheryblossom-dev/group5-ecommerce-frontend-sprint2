import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const DLoginScreen = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            setApiError("");

            try {
                await handleLogin(formData.email, formData.password);
                navigate("/");
            } catch (error) {
                console.error("Login Failed:", error);
                setApiError(error.message || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่");
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
                            สุขภาพดี
                            <br />
                            เริ่มจากทุกมื้อ
                        </h1>
                        <p className="text-[#8e8a83] text-lg max-w-sm leading-relaxed">
                            อาหาร clean food ส่งตรงถึงบ้านคุณ สด สะอาด
                            คำนวณแคลอรี่ให้ครบ
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {["🍗", "🥗", "🥤", "🍱"].map((icon, i) => (
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
                        {/* err msg */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded-lg text-sm font-bold text-center mb-4">
                                ❌ {apiError}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#6d675f] uppercase tracking-wider">
                                อีเมล
                            </label>
                            <div
                                className={`relative flex items-center border rounded-lg transition-all ${errors.email ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
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
                            <label className="text-xs font-bold text-[#6d675f] uppercase tracking-wider mb-1 block">
                                รหัสผ่าน
                            </label>
                            <div
                                className={`relative flex items-center border rounded-lg transition-all ${errors.password ? "border-red-400 bg-red-50/30" : "border-[#e5dfd3] focus-within:border-[#5B8C5A]"}`}
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

                        {/* Submit Button */}
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
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>

                        <p className="text-center text-[13px] text-[#8e8a83] pt-4">
                            ยังไม่มีบัญชี?{" "}
                            <button
                                type="button"
                                className="text-[#5B8C5A] font-bold hover:underline"
                                onClick={() => navigate("/register")}
                            >
                                สมัครสมาชิก
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DLoginScreen;
