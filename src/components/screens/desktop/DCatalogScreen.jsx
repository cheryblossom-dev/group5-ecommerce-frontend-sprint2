import { useNavigate } from 'react-router-dom' // เพิ่มการนำเข้า useNavigate

const DCatalogScreen = () => {
    const navigate = useNavigate() // เรียกใช้งาน hook สำหรับเปลี่ยนหน้า

    const categories = [
        { id: 1, name: 'อกไก่ปั่น', icon: '🍗', active: true },
        { id: 2, name: 'สลัด & Bowl', icon: '🥗', active: false },
        { id: 3, name: 'Smoothie', icon: '🥤', active: false },
        { id: 4, name: 'Meal Plan', icon: '🍱', active: false },
        { id: 5, name: 'Supplement', icon: '💊', active: false },
    ]

    const products = [
        {
            id: 1,
            name: 'อกไก่ปั่น ข้าวกล้อง',
            price: 89,
            kcal: 420,
            p: '40g',
            tag: 'Best Seller',
            color: 'bg-[#e5ebe4]',
            desc: 'อกไก่สดปั่นเนียน ปรุงรสเบาๆ เสิร์ฟพร้อมข้าวกล้องหุงสุก ผักดอง และซอสสมุนไพร เหมาะสำหรับผู้ที่ต้องการโปรตีนสูง',
        },
        {
            id: 2,
            name: 'อกไก่ปั่น ผักดอง',
            price: 89,
            kcal: 380,
            p: '38g',
            tag: 'New',
            color: 'bg-[#f5f5f0]',
            desc: 'อกไก่ปั่นสูตรพิเศษผสมผักดองรสชาติกลมกล่อม ทานง่าย ได้สุขภาพ',
        },
        {
            id: 3,
            name: 'Grilled Chicken Quinoa',
            price: 119,
            kcal: 460,
            p: '42g',
            color: 'bg-[#ebeae4]',
            desc: 'อกไก่ย่างเสิร์ฟพร้อมควินัว สลัดผักสด และน้ำสลัดสูตรพิเศษ',
        },
        {
            id: 4,
            name: 'Chicken Rice Bowl Low Fat',
            price: 99,
            kcal: 400,
            p: '36g',
            color: 'bg-[#f0f0f0]',
            desc: 'ข้าวหน้าไก่สูตรไขมันต่ำ อิ่มอร่อยได้แบบไม่รู้สึกผิด',
        },
        {
            id: 5,
            name: 'Chicken Teriyaki Bowl',
            price: 109,
            kcal: 430,
            p: '39g',
            color: 'bg-[#eeeeee]',
            desc: 'ไก่เทอริยากิรสชาติเข้มข้นสไตล์ญี่ปุ่น พร้อมผักเคียงและข้าวญี่ปุ่น',
        },
        {
            id: 6,
            name: 'Chicken Caesar Salad',
            price: 99,
            kcal: 350,
            p: '35g',
            color: 'bg-[#f2f2f2]',
            desc: 'ซีซาร์สลัดไก่ย่าง ผักกาดคอสสดกรอบ ขนมปังกรอบ และชีสคุณภาพดี',
        },
    ]

    return (
        <div className="flex bg-[#fcfcf9] min-h-screen">
            {/* Sidebar Filter */}
            <aside className="w-64 p-6 border-r border-gray-100 hidden lg:block sticky top-64px h-[calc(100vh-64px)]">
                <h2 className="font-bold text-gray-800 mb-4">หมวดหมู่</h2>
                <ul className="space-y-2 mb-8">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${cat.active ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            <span>{cat.icon}</span> {cat.name}
                        </li>
                    ))}
                </ul>

                <h2 className="font-bold text-gray-800 mb-4">กรองตาม</h2>
                <div className="space-y-3 mb-8">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Diet Type
                    </p>
                    {[
                        'Keto',
                        'Vegan',
                        'Gluten Free',
                        'High Protein',
                        'Low Carb',
                    ].map((diet) => (
                        <label
                            key={diet}
                            className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                defaultChecked={diet === 'High Protein'}
                            />
                            <span className="group-hover:text-gray-900">
                                {diet}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="mb-8">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                        ราคา
                    </p>
                    <div className="h-1.5 bg-gray-200 rounded-full relative">
                        <div className="absolute left-0 right-1/4 h-full bg-green-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase">
                        <span>฿0</span> <span>฿300</span>
                    </div>
                </div>

                <button className="w-full py-3 bg-[#ebeae4] text-gray-700 font-bold rounded-xl hover:bg-[#e2e1d8] transition-colors text-sm">
                    ล้างตัวกรอง
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-2xl font-bold text-gray-800">
                            อกไก่ปั่น
                        </h1>
                        <span className="text-sm text-gray-400">12 เมนู</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">เรียงโดย:</span>
                        <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20">
                            <option>แนะนำ</option>
                            <option>ราคา: ต่ำ-สูง</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)} // เพิ่มฟังก์ชันกดแล้วเปลี่ยนหน้า
                            className="bg-white rounded-24px overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-green-900/5 transition-all group cursor-pointer"
                        >
                            <div
                                className={`h-48 ${item.color} relative flex items-center justify-center`}
                            >
                                <span className="text-gray-400 text-xs italic font-serif text-center px-4">
                                    [ Image: {item.name} ]
                                </span>
                                {item.tag && (
                                    <span
                                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white ${item.tag === 'Best Seller' ? 'bg-[#4b6343]' : 'bg-[#e49c5e]'}`}
                                    >
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
                                            e.stopPropagation() // กันไม่ให้กดปุ่มแล้วไปหน้ารายละเอียด
                                            console.log(
                                                'Add to cart:',
                                                item.name,
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
            </main>
        </div>
    )
}

export default DCatalogScreen
