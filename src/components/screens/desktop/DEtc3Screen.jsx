import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Sun, Zap, Heart } from 'lucide-react'

const DEtc3Screen = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#fcfcf9] font-sans">
            {/* Hero Header */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200"
                    className="w-full h-full object-cover"
                    alt="Healthy food lifestyle"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-8 left-8 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/40 transition-all"
                    >
                        <ChevronLeft size={20} /> กลับหน้าหลัก
                    </button>
                    <h1 className="text-4xl md:text-6xl font-black text-center mb-4 leading-tight">
                        Quality Food,
                        <br />
                        Quality Life
                    </h1>
                    <p className="text-lg opacity-90">
                        เพราะอาหารที่คุณเลือก คือชีวิตที่คุณเป็น
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-8 py-20 -mt-20 relative z-10">
                <div className="bg-white rounded-[48px] p-10 md:p-16 shadow-xl shadow-gray-200/50">
                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                        <p className="text-xl text-[#5c8254] font-bold mb-8">
                            การเลือกกินอาหารที่ดีไม่ใช่แค่การลดน้ำหนัก
                            แต่คือการลงทุนกับ "ต้นทุนชีวิต" ที่คุ้มค่าที่สุด
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            1. พลังงานที่ยั่งยืน (Sustained Energy)
                        </h2>
                        <p className="mb-8">
                            อาหารที่ผ่านการปรุงแต่งน้อย (Whole Foods)
                            อย่างอกไก่ปั่นหรือธัญพืชไม่ขัดสี
                            จะให้พลังงานที่ค่อยๆ ปล่อยเข้าสู่กระแสเลือด
                            ช่วยให้คุณมีสมาธิในการเรียนซอฟต์แวร์หรือทำงานได้นานขึ้นโดยไม่รู้สึกโหยระหว่างวัน
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                            {[
                                {
                                    icon: <Sun className="text-orange-500" />,
                                    label: 'อารมณ์แจ่มใส',
                                },
                                {
                                    icon: <Zap className="text-yellow-500" />,
                                    label: 'สมองแล่น',
                                },
                                {
                                    icon: <Heart className="text-red-500" />,
                                    label: 'หลับสนิท',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-[#fcfcf9] p-6 rounded-3xl text-center border border-gray-100"
                                >
                                    <div className="flex justify-center mb-3">
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-gray-700">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            2. Gut-Brain Connection
                        </h2>
                        <p className="mb-8">
                            คุณรู้หรือไม่ว่าลำไส้คือ "สมองที่สอง" ของมนุษย์?
                            การรับประทานอาหารที่มีจุลินทรีย์ที่ดีและกากใยสูง
                            ส่งผลโดยตรงต่อการหลั่งสารเซโรโทนินที่ควบคุมความสุข
                            ทำให้คุณรับมือกับ Bug
                            หรือความเครียดได้ดีขึ้นอย่างไม่น่าเชื่อ
                        </p>

                        <div className="rounded-xl overflow-hidden my-12">
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000"
                                alt="Fresh salad bowl"
                            />
                        </div>

                        <p>
                            ที่ Juicy Healthy เราจึงไม่ได้มองว่าเราแค่ขายอาหาร
                            แต่เรากำลังส่งต่อ "คุณภาพชีวิต"
                            ที่เริ่มต้นจากจานอาหารที่สะอาดและเปี่ยมไปด้วยสารอาหารที่ร่างกายต้องการจริงๆ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DEtc3Screen
