import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DHomeScreen = () => {
    const navigate = useNavigate()

    // ข้อมูลบทความสำหรับ Carousel/Section
    const articles = [
        {
            title: '5 เคล็ดลับการเริ่ม Meal Plan สำหรับมือใหม่',
            desc: 'เปลี่ยนการกินให้เป็นเรื่องง่ายด้วยการวางแผนล่วงหน้า...',
            img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
            link: '/etc2',
        },
        {
            title: 'ประโยชน์ของอกไก่ปั่นที่คุณอาจยังไม่รู้',
            desc: 'ทำไมเหล่านักกล้ามและคนรักสุขภาพถึงเลือกอกไก่ปั่น...',
            img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500',
            link: '/etc1',
        },
        {
            title: 'กินอย่างไรให้หุ่นดีแบบยั่งยืน',
            desc: 'เทคนิคการเลือกอาหาร Clean Food ให้เข้ากับไลฟ์สไตล์...',
            img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=500',
            link: '/etc1',
        },
    ]

    return (
        <div className="min-h-screen bg-[#fcfcf9] pb-20">
            {/* 1. Hero Visual Section */}
            <section className="bg-[#4b6343] text-white px-8 py-20 md:py-32 relative overflow-hidden">
                <div className="max-w-281.5 mx-auto text-center z-10 relative">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                        Welcome to Juicy Healthy
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">
                        กินดีเพื่อชีวิตที่ดี <br />
                        <span className="text-[#c1d1b3]">
                            สุขภาพดีเริ่มที่นี่
                        </span>
                    </h1>
                    <p className="text-[#c1d1b3] mb-12 max-w-2xl mx-auto leading-relaxed text-lg">
                        คัดสรรวัตถุดิบออร์แกนิก ปรุงสดใหม่ทุกมื้อ
                        เพื่อส่งมอบพลังงานสะอาดให้กับร่างกายของคุณในทุกๆ วัน
                    </p>
                    <div className="flex justify-center gap-6">
                        <Button
                            onClick={() => navigate('/catalog')}
                            className="bg-[#72a25f] hover:bg-[#5f8a4f] text-white px-10 py-7 rounded-2xl font-bold text-lg shadow-xl shadow-black/20 transition-all hover:-translate-y-1"
                        >
                            สำรวจเมนูของเรา
                        </Button>
                    </div>
                </div>
                {/* Visual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* 2. Static Feature Section (แทนที่ส่วนเลือกหมวดหมู่ที่ยุ่งยาก) */}
            <section className="max-w-281.5 mx-auto px-8 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Organic 100%',
                            desc: 'วัตถุดิบจากฟาร์มธรรมชาติ',
                            icon: '🌱',
                        },
                        {
                            title: 'High Protein',
                            desc: 'พลังงานสูงเพื่อกล้ามเนื้อ',
                            icon: '💪',
                        },
                        {
                            title: 'Fast Delivery',
                            desc: 'จัดส่งรวดเร็วภายใน 45 นาที',
                            icon: '🚀',
                        },
                    ].map((feat, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl flex items-center gap-5"
                        >
                            <span className="text-4xl">{feat.icon}</span>
                            <div>
                                <h3 className="font-bold text-gray-800">
                                    {feat.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {feat.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Article Highlights (Carousel-like Section) */}
            <section className="max-w-281.5 mx-auto px-8 mt-24">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">
                            บทความน่าสนใจ
                        </h2>
                        <p className="text-gray-400">
                            อัปเดตความรู้และเทคนิคดูแลสุขภาพจากผู้เชี่ยวชาญ
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-[#72a25f] font-bold hover:bg-green-50"
                        onClick={() => navigate('/etc1')}
                    >
                        อ่านทั้งหมด <ArrowRight size={18} className="ml-2" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((art, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(art.link)}
                            className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={art.img}
                                    alt={art.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star
                                        size={12}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="text-[10px] font-bold text-gray-800 uppercase">
                                        Recommended
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#72a25f] transition-colors line-clamp-2">
                                    {art.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {art.desc}
                                </p>
                                <div className="flex items-center text-[#72a25f] font-bold text-sm">
                                    อ่านต่อ{' '}
                                    <BookOpen size={16} className="ml-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Simple Call to Action */}
            <section className="max-w-281.5 mx-auto px-8 mt-24 text-center">
                <div className="bg-[#eceae0] py-16 px-8 rounded-[60px] relative overflow-hidden">
                    <h2 className="text-3xl font-black text-gray-800 mb-6 relative z-10">
                        เริ่มเปลี่ยนคุณคนใหม่ไปกับเราวันนี้
                    </h2>
                    <p className="text-gray-500 mb-10 max-w-lg mx-auto relative z-10">
                        เลือกดูรายการสินค้าและเริ่มต้น Meal Plan
                        ที่เหมาะกับคุณเพื่อสุขภาพที่ยั่งยืน
                    </p>
                    <Button
                        onClick={() => navigate('/catalog')}
                        className="bg-[#4b6343] hover:bg-black text-white px-12 py-7 rounded-2xl font-bold relative z-10"
                    >
                        ไปที่หน้าร้านค้า
                    </Button>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                </div>
            </section>
        </div>
    )
}

export default DHomeScreen
