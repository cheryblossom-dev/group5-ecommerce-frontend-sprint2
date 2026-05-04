import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DProductDetailScreen = () => {
    const { id } = useParams() // รับค่า ID จาก URL
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(1)
    const [spicyLevel, setSpicyLevel] = useState('ไม่เผ็ด')

    // ข้อมูลสินค้า (ปกติควรดึงมาจากไฟล์ส่วนกลางหรือ API)
    const products = [
        {
            id: 1,
            name: 'อกไก่ปั่น ข้าวกล้อง',
            price: 89,
            kcal: 420,
            p: '40g',
            carbs: '35g',
            fat: '8g',
            color: 'bg-[#e5ebe4]',
            desc: 'อกไก่สดปั่นเนียน ปรุงรสเบาๆ เสิร์ฟพร้อมข้าวกล้องหุงสุก ผักดอง และซอสสมุนไพร เหมาะสำหรับผู้ที่ต้องการโปรตีนสูง',
        },
        {
            id: 2,
            name: 'อกไก่ปั่น ผักดอง',
            price: 89,
            kcal: 380,
            p: '38g',
            carbs: '30g',
            fat: '7g',
            color: 'bg-[#f5f5f0]',
            desc: 'อกไก่ปั่นสูตรพิเศษผสมผักดองรสชาติกลมกล่อม ทานง่าย ได้สุขภาพ',
        },
        {
            id: 3,
            name: 'Grilled Chicken Quinoa',
            price: 119,
            kcal: 460,
            p: '42g',
            carbs: '45g',
            fat: '10g',
            color: 'bg-[#ebeae4]',
            desc: 'อกไก่ย่างเสิร์ฟพร้อมควินัว สลัดผักสด และน้ำสลัดสูตรพิเศษ',
        },
        {
            id: 4,
            name: 'Chicken Rice Bowl Low Fat',
            price: 99,
            kcal: 400,
            p: '36g',
            carbs: '50g',
            fat: '5g',
            color: 'bg-[#f0f0f0]',
            desc: 'ข้าวหน้าไก่สูตรไขมันต่ำ อิ่มอร่อยได้แบบไม่รู้สึกผิด',
        },
        {
            id: 5,
            name: 'Chicken Teriyaki Bowl',
            price: 109,
            kcal: 430,
            p: '39g',
            carbs: '55g',
            fat: '9g',
            color: 'bg-[#eeeeee]',
            desc: 'ไก่เทอริยากิรสชาติเข้มข้นสไตล์ญี่ปุ่น พร้อมผักเคียงและข้าวญี่ปุ่น',
        },
        {
            id: 6,
            name: 'Chicken Caesar Salad',
            price: 99,
            kcal: 350,
            p: '35g',
            carbs: '15g',
            fat: '18g',
            color: 'bg-[#f2f2f2]',
            desc: 'ซีซาร์สลัดไก่ย่าง ผักกาดคอสสดกรอบ ขนมปังกรอบ และชีสคุณภาพดี',
        },
    ]

    // ค้นหาสินค้าตาม ID
    const product = products.find((p) => p.id === parseInt(id))

    // กรณีไม่พบสินค้า
    if (!product)
        return <div className="p-20 text-center font-bold">ไม่พบสินค้า</div>

    const nutrition = [
        { label: 'แคลอรี่', value: product.kcal, unit: 'kcal' },
        { label: 'โปรตีน', value: product.p.replace('g', ''), unit: 'g' },
        { label: 'คาร์บ', value: product.carbs.replace('g', ''), unit: 'g' },
        { label: 'ไขมัน', value: product.fat.replace('g', ''), unit: 'g' },
    ]

    const spicyOptions = ['ไม่เผ็ด', 'เผ็ดน้อย', 'เผ็ดปานกลาง', 'เผ็ดมาก']

    return (
        <div className="min-h-screen bg-[#fcfcf9] p-8 md:p-12">
            <button
                onClick={() => navigate('/catalog')} // หรือใช้ navigate(-1) เพื่อย้อนกลับตาม history
                className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-6 font-bold text-sm cursor-pointer"
            >
                <span>←</span> ย้อนกลับไปหน้าเมนู
            </button>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: Image Gallery */}
                <div className="max-w-500px w-full mx-auto lg:mx-0 space-y-4">
                    <div
                        className={`aspect-square ${product.color} rounded-32px flex items-center justify-center border border-gray-100 shadow-sm`}
                    >
                        <span className="text-gray-400 text-sm italic text-center px-4">
                            📷 รูปอาหาร – {product.name}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`aspect-square ${product.color} opacity-50 rounded-2xl border border-gray-100 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col max-w-550px">
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <span className="bg-[#5c8254] text-white px-3 py-1 rounded-full text-xs font-bold">
                            High Protein
                        </span>
                        <span className="bg-[#eceae0] text-gray-600 px-3 py-1 rounded-full text-xs font-bold italic">
                            Clean Food
                        </span>
                    </div>

                    <h1 className="text-3xl font-black text-gray-800 mb-2">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-black text-[#5c8254] mb-6">
                        ฿{product.price}
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {product.desc}
                    </p>

                    {/* Nutrition Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {nutrition.map((item) => (
                            <div
                                key={item.label}
                                className="bg-[#eceae0]/50 border border-gray-100 p-4 rounded-2xl text-center"
                            >
                                <p className="text-xl font-black text-gray-800">
                                    {item.value}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                    {item.unit}
                                </p>
                                <p className="text-[11px] text-gray-500 mt-1">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Spicy Level Selection */}
                    <div className="mb-8">
                        <p className="text-sm font-bold text-gray-800 mb-4">
                            ระดับความเผ็ด
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {spicyOptions.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSpicyLevel(level)}
                                    className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
                                        spicyLevel === level
                                            ? 'bg-[#e5f0e1] border-[#5c8254] text-[#5c8254]'
                                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions: Quantity & Add to Cart */}
                    <div className="mt-auto flex items-center gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-[#eceae0] rounded-xl px-4 py-3 gap-6">
                            <button
                                onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                                className="text-gray-400 hover:text-gray-800 font-bold text-lg"
                            >
                                −
                            </button>
                            <span className="font-bold text-gray-800 w-4 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="text-gray-400 hover:text-gray-800 font-bold text-lg"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex-1 bg-[#5c8254] hover:bg-[#4a6b43] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/10 active:scale-[0.98]">
                            เพิ่มลงตะกร้า — ฿{product.price * quantity}
                        </button>

                        {/* Wishlist Button */}
                        <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                            🤍
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DProductDetailScreen
