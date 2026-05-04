import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DHomeScreen = () => {
    const navigate = useNavigate()

    const categories = [
        { name: 'อกไก่ปั่น', icon: '🍗', active: true },
        { name: 'สลัด & Bowl', icon: '🥗', active: false },
        { name: 'Smoothie', icon: '🥤', active: false },
        { name: 'Meal Plan', icon: '🍱', active: false },
        { name: 'Supplement', icon: '💊', active: false },
        { name: 'โปรตีนอื่น', icon: '🔥', active: false },
    ]

    const recommendations = [
        {
            id: 1,
            name: 'อกไก่ปั่น ข้าวกล้อง',
            price: 89,
            kcal: 420,
            p: '40g',
            color: 'bg-[#e5ebe4]',
        },
        {
            id: 7,
            name: 'Grilled Salmon Bowl',
            price: 149,
            kcal: 510,
            p: '35g',
            color: 'bg-[#f5f5f0]',
        },
        {
            id: 8,
            name: 'Detox Salad Bowl',
            price: 99,
            kcal: 280,
            p: '12g',
            color: 'bg-[#ebeae4]',
        },
        {
            id: 9,
            name: 'Green Protein Smoothie',
            price: 79,
            kcal: 210,
            p: '25g',
            color: 'bg-[#f0f0f0]',
        },
    ]

    return (
        <div className="min-h-screen bg-[#fcfcf9] pb-20">
            {/* 1. Hero Section */}
            <section className="bg-[#4b6343] text-white px-8 py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-281.5 mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="z-10">
                        <p className="text-[#c1d1b3] font-medium mb-4">
                            สวัสดี คุณสมชาย 👋
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            วันนี้กินอะไรดี?
                            <br />
                            เลือกเมนู healthy ได้เลย
                        </h1>
                        <p className="text-[#c1d1b3] mb-10 max-w-md leading-relaxed text-sm">
                            อาหาร clean food สด ปรุงใหม่ทุกวัน ส่งถึงบ้านภายใน
                            45 นาที พร้อมข้อมูลโภชนาการที่ครบถ้วน
                        </p>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => navigate('/catalog')}
                                className="bg-[#72a25f] hover:bg-[#5f8a4f] text-white px-8 py-6 rounded-2xl font-bold flex gap-2 items-center transition-transform active:scale-95"
                            >
                                สั่งเลย <ArrowRight size={18} />
                            </Button>
                            <Button
                                onClick={() => navigate('/etc2')}
                                variant="outline"
                                className="bg-white/10 border-white/20 hover:bg-white/20 text-white px-8 py-6 rounded-2xl font-bold backdrop-blur-sm"
                            >
                                ดู Meal Plan
                            </Button>
                        </div>
                    </div>

                    {/* Image Placeholder Frame */}
                    <div className="hidden md:block relative">
                        <div className="w-full aspect-16/10 bg-[#5a7551] rounded-[40px] border-4 border-[#6a875f] flex items-center justify-center shadow-2xl">
                            <span className="text-[#4b6343] text-xs italic font-serif">
                                [ Hero Image - อาหาร Healthy ยอดนิยม ]
                            </span>
                        </div>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#5a7551] rounded-full blur-3xl opacity-50"></div>
            </section>

            {/* 2. Category Selection */}
            <section className="max-w-281.5 mx-auto px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => navigate('/catalog')}
                            className={`cursor-pointer group p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-xl active:scale-95
                                ${
                                    cat.active
                                        ? 'bg-[#eef6ea] border-[#72a25f]'
                                        : 'bg-white border-transparent hover:border-[#72a25f]/30'
                                }`}
                        >
                            <span className="text-2xl group-hover:scale-125 transition-transform">
                                {cat.icon}
                            </span>
                            <span
                                className={`text-[13px] font-bold ${cat.active ? 'text-[#3d6c36]' : 'text-gray-500'}`}
                            >
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Recommended Today */}
            <section className="max-w-281.5 mx-auto px-8 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        แนะนำวันนี้
                    </h2>
                    <Link
                        to="/catalog"
                        className="text-[#72a25f] text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        ดูทั้งหมด <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="bg-white rounded-[28px] overflow-hidden border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
                        >
                            <div
                                className={`h-40 ${item.color} relative flex items-center justify-center`}
                            >
                                <span className="text-gray-400 text-[10px] italic font-serif px-4 text-center">
                                    {item.name}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                                    {item.name}
                                </h3>
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-green-50 text-[9px] font-bold text-[#72a25f] px-2 py-0.5 rounded uppercase">
                                        {item.kcal} kcal
                                    </span>
                                    <span className="bg-orange-50 text-[9px] font-bold text-orange-600 px-2 py-0.5 rounded uppercase">
                                        P {item.p}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-gray-900">
                                        ฿{item.price}
                                    </span>
                                    <button className="bg-[#5c8254] text-white px-4 py-2 rounded-xl text-[10px] font-bold transition-transform active:scale-90">
                                        + ตะกร้า
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default DHomeScreen
