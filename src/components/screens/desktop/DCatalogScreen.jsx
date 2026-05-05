import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, products } from '../../../data/products'

const DCatalogScreen = () => {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState(0)

    const filteredProducts =
        selectedCategory === 0
            ? products
            : products
                  .filter((p) => p.categoryId === selectedCategory)
                  .slice(0, 4)

    return (
        <div className="flex flex-col lg:flex-row bg-[#fcfcf9] min-h-screen font-sans">
            {/* 1. Mobile Sticky Category Bar (ปรับเป็น Flex Wrap สำหรับจอ 360px) */}
            <div className="lg:hidden sticky top-16 z-30 bg-[#fcfcf9]/95 backdrop-blur-md border-b border-[#ddd6c8]">
                {/* เปลี่ยนเป็น flex-wrap และลด gap เพื่อให้ปุ่มจัดเรียงลงมาแถว 2 ได้พอดี */}
                <div className="flex flex-wrap justify-center py-3 px-2 gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-sm
                                ${
                                    selectedCategory === cat.id
                                        ? 'bg-[#5c8254] text-white'
                                        : 'bg-white text-[#8e8a83] border border-[#eee7db]'
                                }`}
                        >
                            <span className="text-sm">{cat.icon}</span>{' '}
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Sidebar Filter (โชว์เฉพาะ Desktop) */}
            <aside className="w-64 p-6 border-r border-gray-100 hidden lg:block sticky top-16 h-[calc(100vh-64px)]">
                <h2 className="font-bold text-gray-800 mb-6">หมวดหมู่</h2>
                <ul className="space-y-2 mb-8">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all 
                                ${
                                    selectedCategory === cat.id
                                        ? 'bg-[#eef6ea] text-[#5c8254] font-bold border border-[#d6d2c7]/30'
                                        : 'hover:bg-gray-50 text-gray-600'
                                }`}
                        >
                            <span className="text-xl">{cat.icon}</span>{' '}
                            {cat.name}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setSelectedCategory(0)}
                    className="w-full py-3.5 bg-[#ebeae4] text-gray-700 font-bold rounded-xl hover:bg-[#e2e1d8] transition-colors text-xs"
                >
                    ล้างตัวกรอง (ทั้งหมด)
                </button>
            </aside>

            {/* 3. Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-2xl font-black text-gray-800">
                            {categories.find((c) => c.id === selectedCategory)
                                ?.name || 'รายการสินค้า'}
                        </h1>
                        <span className="text-sm font-bold text-gray-400">
                            {filteredProducts.length} เมนู
                        </span>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all group cursor-pointer"
                        >
                            <div
                                className={`h-52 ${item.color} relative flex items-center justify-center`}
                            >
                                <span className="text-gray-400 text-xs italic font-serif text-center px-4">
                                    [ Image: {item.name} ]
                                </span>
                                {item.tag && (
                                    <span className="absolute top-5 left-5 px-3 py-1 rounded-xl text-[10px] font-black text-white bg-[#5c8254] uppercase tracking-wider">
                                        {item.tag}
                                    </span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-800 mb-3 group-hover:text-[#5c8254] transition-colors text-lg leading-tight">
                                    {item.name}
                                </h3>
                                <div className="flex gap-2 mb-5">
                                    <span className="bg-[#eef6ea] text-[10px] font-black text-[#5c8254] px-2.5 py-1 rounded-md uppercase">
                                        {item.kcal} kcal
                                    </span>
                                    <span className="bg-[#fcf8ef] text-[10px] font-black text-[#d4a373] px-2.5 py-1 rounded-md uppercase">
                                        P {item.p}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-gray-900">
                                        ฿{item.price}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            alert(
                                                `เพิ่ม ${item.name} ลงตะกร้าเรียบร้อย`,
                                            )
                                        }}
                                        className="bg-[#5c8254] hover:bg-[#4a6b43] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md shadow-green-900/10"
                                    >
                                        + ตะกร้า
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-gray-400 font-bold">
                            ไม่พบสินค้าในหมวดหมู่นี้
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default DCatalogScreen
