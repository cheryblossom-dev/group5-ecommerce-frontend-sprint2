import { products, categories } from '@/data/products'

const categoryMap = Object.fromEntries(
    categories.map((c) => [c.id, c])
)

const tagColor = {
    'Best Seller': 'bg-green-100 text-green-700',
    'New':         'bg-blue-100 text-blue-700',
    'Best Value':  'bg-yellow-100 text-yellow-700',
    'Popular':     'bg-purple-100 text-purple-700',
}

export default function AdminProducts() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Products</h1>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายการสินค้า ({products.length})
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">ID</th>
                            <th className="text-left px-6 py-3 font-medium">ชื่อสินค้า</th>
                            <th className="text-left px-6 py-3 font-medium">หมวดหมู่</th>
                            <th className="text-left px-6 py-3 font-medium">ราคา</th>
                            <th className="text-left px-6 py-3 font-medium">แคลอรี่</th>
                            <th className="text-left px-6 py-3 font-medium">Tag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const cat = categoryMap[product.categoryId]
                            return (
                                <tr key={product.id} className="border-t border-[#DDD9D0]">
                                    <td className="px-6 py-4 font-medium text-[#5B8C5A]">
                                        {product.id}
                                    </td>
                                    <td className="px-6 py-4 text-[#1C1C1A] font-medium">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-[#8A8780]">
                                        {cat ? `${cat.icon} ${cat.name}` : '—'}
                                    </td>
                                    <td className="px-6 py-4 text-[#1C1C1A]">
                                        ฿{product.price}
                                    </td>
                                    <td className="px-6 py-4 text-[#1C1C1A]">
                                        {product.kcal} kcal
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.tag ? (
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagColor[product.tag] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {product.tag}
                                            </span>
                                        ) : (
                                            <span className="text-[#C5C1BA]">—</span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
