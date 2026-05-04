import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react'

const DEtc4Screen = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#fcfcf9] font-sans pb-20">
            <div className="max-w-281.5 mx-auto px-8 py-16">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 text-gray-400 hover:text-[#5c8254] flex items-center gap-2 font-bold transition-colors"
                >
                    <ChevronLeft size={18} /> กลับหน้าหลัก
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-[#5c8254] font-black tracking-widest uppercase text-sm mb-4 block">
                            Productivity & Nutrition
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 leading-tight">
                            60 นาทีเปลี่ยนสุขภาพ <br /> สำหรับชาว Developer
                        </h1>
                        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                            หลายคนมองว่าการดูแลสุขภาพใช้เวลานาน
                            แต่ความจริงแล้วเพียงการเลือก "สิ่งที่ใส่เข้าปาก"
                            ในหนึ่งมื้อ
                            ก็เปลี่ยนประสิทธิภาพการทำงานของคุณไปได้ทั้งวัน
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    title: '10 Mins: Prepare',
                                    desc: 'เลือกเมนูที่มีโปรตีนสูงและน้ำตาลต่ำเพื่อเลี่ยงอาการ Food Coma',
                                },
                                {
                                    title: '20 Mins: Mindful Eating',
                                    desc: 'ละสายตาจากหน้าจอ แล้วดื่มด่ำกับรสชาติอาหารจริงๆ',
                                },
                                {
                                    title: '30 Mins: Light Move',
                                    desc: 'เดินยืดเส้นยืดสายเบาๆ เพื่อกระตุ้นระบบเผาผลาญ',
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2
                                            className="text-[#72a25f]"
                                            size={22}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-4/5 rounded-[60px] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1515683359900-6922e4964be1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="w-full h-full object-cover"
                                alt="Modern workspace with healthy food"
                            />
                        </div>
                        {/* Floating Info Card */}
                        <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100 max-w-60">
                            <ShieldCheck
                                className="text-[#72a25f] mb-3"
                                size={32}
                            />
                            <p className="font-bold text-gray-800 leading-tight">
                                ได้รับการยืนยันจากโภชนากร
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                สูตรอาหารที่ Juicy Healthy
                                ช่วยรักษาระดับน้ำตาลในเลือดให้คงที่
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="mt-32 bg-[#4b6343] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">
                        พร้อมเริ่มมื้อที่ดีที่สุดหรือยัง?
                    </h2>
                    <p className="text-[#c1d1b3] mb-10 max-w-xl mx-auto relative z-10">
                        ไม่ต้องเสียเวลาเตรียมเอง
                        เราคำนวณสารอาหารที่จำเป็นมาให้คุณครบแล้วในทุกเมนู
                    </p>
                    <button
                        onClick={() => navigate('/catalog')}
                        className="bg-[#72a25f] hover:bg-white hover:text-[#4b6343] text-white px-12 py-4 rounded-2xl font-bold transition-all relative z-10"
                    >
                        สั่งอาหารตอนนี้
                    </button>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                </div>
            </div>
        </div>
    )
}

export default DEtc4Screen
