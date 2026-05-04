import { useState } from 'react'

const ProductDetailScreen = () => {
    const [quantity, setQuantity] = useState(1)
    const [spicyLevel, setSpicyLevel] = useState('ไม่เผ็ด')

    const nutrition = [
        { label: 'แคลอรี่', value: '420', unit: 'kcal' },
        { label: 'โปรตีน', value: '40', unit: 'g' },
        { label: 'คาร์บ', value: '35', unit: 'g' },
        { label: 'ไขมัน', value: '8', unit: 'g' },
    ]

    const spicyOptions = ['ไม่เผ็ด', 'เผ็ดน้อย', 'เผ็ดปานกลาง', 'เผ็ดมาก']

    return (
        <div className="min-h-screen bg-[#fcfcf9] p-8 md:p-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-[#eceae0] rounded-32px flex items-center justify-center border border-gray-100">
                        <span className="text-gray-400 text-sm italic">
                            📷 รูปอาหาร – อกไก่ปั่น ข้าวกล้อง
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="aspect-square bg-[#eceae0] rounded-2xl border border-gray-100 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <span className="bg-[#5c8254] text-white px-3 py-1 rounded-full text-xs font-bold">
                            High Protein
                        </span>
                        <span className="bg-[#eceae0] text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                            Low Carb
                        </span>
                        <span className="bg-[#eceae0] text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                            Gluten Free
                        </span>
                    </div>

                    <h1 className="text-3xl font-black text-gray-800 mb-2">
                        อกไก่ปั่น ข้าวกล้อง
                    </h1>
                    <p className="text-2xl font-black text-[#5c8254] mb-6">
                        ฿89
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        อกไก่สดปั่นเนียน ปรุงรสเบาๆ เสิร์ฟพร้อมข้าวกล้องหุงสุก
                        ผักดอง และซอสสมุนไพร เหมาะสำหรับผู้ที่ต้องการโปรตีนสูง
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
                                className="text-gray-400 hover:text-gray-800 font-bold"
                            >
                                −
                            </button>
                            <span className="font-bold text-gray-800 w-4 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="text-gray-400 hover:text-gray-800 font-bold"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex-1 bg-[#5c8254] hover:bg-[#4a6b43] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/10 active:scale-[0.98]">
                            เพิ่มลงตะกร้า — ฿{89 * quantity}
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

export default ProductDetailScreen
