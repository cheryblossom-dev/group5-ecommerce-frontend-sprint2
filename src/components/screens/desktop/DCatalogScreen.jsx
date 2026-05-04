import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, products } from '../../../data/products'

const DCatalogScreen = () => {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState(0) // 0 คือ 'ทั้งหมด'

    // Logic การกรองข้อมูล:
    // ถ้าเลือก 0 ให้โชว์หมด แต่ถ้าเลือกหมวดอื่น ให้กรองเอาเฉพาะหมวดนั้นมาแค่ 4 รายการ
    const filteredProducts =
        selectedCategory === 0
            ? products
            : products
                  .filter((p) => p.categoryId === selectedCategory)
                  .slice(0, 4)

    return (
        <div className="flex bg-[#fcfcf9] min-h-screen">
            {/* Sidebar Filter */}
            <aside className="w-64 p-6 border-r border-gray-100 hidden lg:block sticky top-64px h-[calc(100vh-64px)]">
                <h2 className="font-bold text-gray-800 mb-4">หมวดหมู่</h2>
                <ul className="space-y-2 mb-8">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)} // คลิกเพื่อเปลี่ยนหมวดหมู่
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all 
                                ${
                                    selectedCategory === cat.id
                                        ? 'bg-green-50 text-green-700 font-medium'
                                        : 'hover:bg-gray-50 text-gray-600'
                                }`}
                        >
                            <span>{cat.icon}</span> {cat.name}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setSelectedCategory(0)} // ปุ่มล้างตัวกรองให้กลับไปที่ 'ทั้งหมด'
                    className="w-full py-3 bg-[#ebeae4] text-gray-700 font-bold rounded-xl hover:bg-[#e2e1d8] transition-colors text-sm"
                >
                    ล้างตัวกรอง (ทั้งหมด)
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {categories.find((c) => c.id === selectedCategory)
                                ?.name || 'รายการสินค้า'}
                        </h1>
                        <span className="text-sm text-gray-400">
                            {filteredProducts.length} เมนู
                        </span>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)} // เปลี่ยนหน้าไปยังรายละเอียดสินค้า
                            className="bg-white rounded-24px overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-green-900/5 transition-all group cursor-pointer"
                        >
                            <div
                                className={`h-48 ${item.color} relative flex items-center justify-center`}
                            >
                                <span className="text-gray-400 text-xs italic font-serif text-center px-4">
                                    [ Image: {item.name} ]
                                </span>
                                {item.tag && (
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-[#4b6343]">
                                        {item.tag}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors text-lg">
                                    {item.name}
                                </h3>
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-green-50 text-[10px] font-bold text-green-700 px-2 py-0.5 rounded uppercase">
                                        {item.kcal} kcal
                                    </span>
                                    <span className="bg-orange-50 text-[10px] font-bold text-orange-700 px-2 py-0.5 rounded uppercase">
                                        P {item.p}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-black text-gray-900 font-mono">
                                        ฿{item.price}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // ป้องกันไม่ให้กดปุ่มแล้ว Navigate ไปหน้า Detail
                                            alert(
                                                `เพิ่ม ${item.name} ลงตะกร้าเรียบร้อย`,
                                            )
                                        }}
                                        className="bg-[#5c8254] hover:bg-[#4a6b43] text-white px-5 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95"
                                    >
                                        + ตะกร้า
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        ไม่พบสินค้าในหมวดหมู่นี้
                    </div>
                )}
            </main>
        </div>
    )
}

export default DCatalogScreen
