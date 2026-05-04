import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { products } from '../../../data/products'

const DProductDetailScreen = () => {
    const { id } = useParams() // รับค่า ID จาก URL เช่น /product/18
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(1)
    const [spicyLevel, setSpicyLevel] = useState('ไม่เผ็ด')

    const product = products.find((p) => p.id === parseInt(id))

    // กรณีไม่พบสินค้า (เช่น ใส่ ID ที่ไม่มีในระบบ)
    if (!product)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcf9]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    ไม่พบสินค้า
                </h2>
                <button
                    onClick={() => navigate('/catalog')}
                    className="text-[#5c8254] font-bold hover:underline"
                >
                    กลับไปหน้าเมนู
                </button>
            </div>
        )

    const nutrition = [
        { label: 'แคลอรี่', value: product.kcal, unit: 'kcal' },
        { label: 'โปรตีน', value: product.p.replace('g', ''), unit: 'g' },
        {
            label: 'คาร์บ',
            value: product.carbs ? product.carbs.replace('g', '') : '30',
            unit: 'g',
        },
        {
            label: 'ไขมัน',
            value: product.fat ? product.fat.replace('g', '') : '8',
            unit: 'g',
        },
    ]

    const spicyOptions = ['ไม่เผ็ด', 'เผ็ดน้อย', 'เผ็ดปานกลาง', 'เผ็ดมาก']

    return (
        <div className="min-h-screen bg-[#fcfcf9] p-8 md:p-12">
            <button
                onClick={() => navigate('/catalog')}
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

                    {/* Spicy Level */}
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

                    {/* Actions */}
                    <div className="mt-auto flex items-center gap-4">
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

                        <button className="flex-1 bg-[#5c8254] hover:bg-[#4a6b43] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/10 active:scale-[0.98]">
                            เพิ่มลงตะกร้า — ฿{product.price * quantity}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DProductDetailScreen
