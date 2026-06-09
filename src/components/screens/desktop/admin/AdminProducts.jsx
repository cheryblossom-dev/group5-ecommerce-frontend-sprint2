import { useState, useEffect } from 'react'
import { getAdminProducts } from '@/services/admin'
import { getCategories } from '@/services/category'
import { createProduct, updateProduct, deleteProduct } from '@/services/product'

const TAG_OPTIONS = ['Best Seller', 'New', 'Best Value', 'Popular']

const tagColor = {
    'Best Seller': 'bg-green-100 text-green-700',
    'New':         'bg-blue-100 text-blue-700',
    'Best Value':  'bg-yellow-100 text-yellow-700',
    'Popular':     'bg-purple-100 text-purple-700',
}

const inputClass =
    'w-full px-3 py-2 text-sm border border-[#DDD9D0] rounded-lg bg-white ' +
    'focus:outline-none focus:ring-2 focus:ring-[#5B8C5A]/30 focus:border-[#5B8C5A] transition-colors'

const EMPTY_FORM = {
    productname: '',
    price: '',
    categoryId: '',
    quantity: 1,
    kcal: '',
    protein: '',
    carbs: '',
    fat: '',
    tag: '',
    desc: '',
    imageUrl: '',
    isActive: true,
}

function Field({ label, children }) {
    return (
        <div>
            <label className="block text-xs font-medium text-[#8A8780] mb-1">{label}</label>
            {children}
        </div>
    )
}

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryMap, setCategoryMap] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // modal: null | 'add' | 'edit' | 'delete'
    const [modal, setModal] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                getAdminProducts(),
                getCategories(),
            ])
            setProducts(productsRes.data ?? [])
            const cats = categoriesRes.data ?? []
            setCategories(cats)
            setCategoryMap(Object.fromEntries(cats.map((c) => [c._id, c.categoryname])))
        } catch {
            setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [])

    const openAdd = () => {
        setForm(EMPTY_FORM)
        setFormError(null)
        setModal('add')
    }

    const openEdit = (product) => {
        setSelectedProduct(product)
        setForm({
            productname: product.productname ?? '',
            price:       product.price ?? '',
            categoryId:  product.categoryId ?? '',
            quantity:    product.quantity ?? 1,
            kcal:        product.kcal ?? '',
            protein:     product.protein ?? '',
            carbs:       product.carbs ?? '',
            fat:         product.fat ?? '',
            tag:         product.tag ?? '',
            desc:        product.desc ?? '',
            imageUrl:    product.imageUrl ?? '',
            isActive:    product.isActive ?? true,
        })
        setFormError(null)
        setModal('edit')
    }

    const openDelete = (product) => {
        setSelectedProduct(product)
        setFormError(null)
        setModal('delete')
    }

    const closeModal = () => {
        setModal(null)
        setSelectedProduct(null)
        setFormError(null)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setFormError(null)

        const payload = {
            ...form,
            price:    Number(form.price),
            quantity: Number(form.quantity),
            kcal:     form.kcal    ? Number(form.kcal) : undefined,
            protein:  form.protein || undefined,
            carbs:    form.carbs   || undefined,
            fat:      form.fat     || undefined,
            tag:      form.tag     || undefined,
            desc:     form.desc    || undefined,
            imageUrl: form.imageUrl || undefined,
        }

        try {
            if (modal === 'add') {
                await createProduct(payload)
            } else {
                await updateProduct(selectedProduct._id, payload)
            }
            await fetchData()
            closeModal()
        } catch (err) {
            setFormError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        setSubmitting(true)
        setFormError(null)
        try {
            await deleteProduct(selectedProduct._id)
            await fetchData()
            closeModal()
        } catch (err) {
            setFormError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#1C1C1A]">Products</h1>
                <button
                    onClick={openAdd}
                    className="px-4 py-2 bg-[#5B8C5A] text-white text-sm font-medium rounded-lg hover:bg-[#4a7a49] transition-colors cursor-pointer"
                >
                    + เพิ่มสินค้า
                </button>
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายการสินค้า {!loading && `(${products.length})`}
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">#</th>
                            <th className="text-left px-6 py-3 font-medium">ชื่อสินค้า</th>
                            <th className="text-left px-6 py-3 font-medium">หมวดหมู่</th>
                            <th className="text-left px-6 py-3 font-medium">ราคา</th>
                            <th className="text-left px-6 py-3 font-medium">จำนวนสต็อก</th>
                            <th className="text-left px-6 py-3 font-medium">สถานะ</th>
                            <th className="text-left px-6 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    กำลังโหลด...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    ยังไม่มีสินค้า
                                </td>
                            </tr>
                        ) : products.map((product, index) => (
                            <tr
                                key={product._id}
                                className={`border-t border-[#DDD9D0] ${!product.isActive ? 'opacity-50' : ''}`}
                            >
                                <td className="px-6 py-4 text-[#8A8780]">{index + 1}</td>
                                <td className="px-6 py-4 text-[#1C1C1A] font-medium">{product.productname}</td>
                                <td className="px-6 py-4 text-[#8A8780]">
                                    {categoryMap[product.categoryId] ?? '—'}
                                </td>
                                <td className="px-6 py-4 text-[#1C1C1A]">฿{product.price}</td>
                                <td className="px-6 py-4">
                                    {product.quantity === 0 ? (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">หมด</span>
                                    ) : product.quantity < 5 ? (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">{product.quantity}</span>
                                    ) : (
                                        <span className="text-[#1C1C1A]">{product.quantity}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(product)}
                                            className="px-3 py-1 text-xs font-medium text-[#5B8C5A] border border-[#5B8C5A] rounded-md hover:bg-[#5B8C5A] hover:text-white transition-colors cursor-pointer"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => openDelete(product)}
                                            className="px-3 py-1 text-xs font-medium text-red-500 border border-red-300 rounded-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add / Edit Modal */}
            {(modal === 'add' || modal === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">

                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-[#DDD9D0] flex items-center justify-between shrink-0">
                            <h2 className="text-lg font-bold text-[#1C1C1A]">
                                {modal === 'add' ? 'เพิ่มสินค้าใหม่' : 'แก้ไขสินค้า'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-[#8A8780] hover:text-[#1C1C1A] text-xl leading-none cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form
                            id="product-form"
                            onSubmit={handleSubmit}
                            className="overflow-y-auto flex-1 px-6 py-5 space-y-6"
                        >
                            {formError && (
                                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                    {formError}
                                </div>
                            )}

                            {/* ข้อมูลหลัก */}
                            <section className="space-y-3">
                                <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wider">ข้อมูลหลัก</p>
                                <Field label="ชื่อสินค้า *">
                                    <input
                                        name="productname"
                                        value={form.productname}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                        placeholder="เช่น Green Smoothie Bowl"
                                    />
                                </Field>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="ราคา (฿) *">
                                        <input
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.price}
                                            onChange={handleChange}
                                            required
                                            className={inputClass}
                                            placeholder="0"
                                        />
                                    </Field>
                                    <Field label="จำนวนสต็อก">
                                        <input
                                            name="quantity"
                                            type="number"
                                            min="0"
                                            value={form.quantity}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="1"
                                        />
                                    </Field>
                                </div>
                                <Field label="หมวดหมู่ *">
                                    <select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="">— เลือกหมวดหมู่ —</option>
                                        {categories.map((c) => (
                                            <option key={c._id} value={c._id}>{c.categoryname}</option>
                                        ))}
                                    </select>
                                </Field>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Tag">
                                        <select
                                            name="tag"
                                            value={form.tag}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="">— ไม่มี —</option>
                                            {TAG_OPTIONS.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="สถานะ">
                                        <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={form.isActive}
                                                onChange={handleChange}
                                                className="w-4 h-4 accent-[#5B8C5A]"
                                            />
                                            <span className="text-sm text-[#1C1C1A]">เปิดขาย (Active)</span>
                                        </label>
                                    </Field>
                                </div>
                            </section>

                            {/* รูปภาพ */}
                            <section className="space-y-3">
                                <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wider">รูปภาพ</p>
                                <Field label="URL รูปภาพ">
                                    <input
                                        name="imageUrl"
                                        value={form.imageUrl}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="https://..."
                                    />
                                </Field>
                                {form.imageUrl && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#DDD9D0] bg-[#F8F6F2] shrink-0">
                                            <img
                                                src={form.imageUrl}
                                                alt="preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.style.display = 'none' }}
                                            />
                                        </div>
                                        <p className="text-xs text-[#8A8780]">ตัวอย่างรูปภาพ</p>
                                    </div>
                                )}
                            </section>

                            {/* คำอธิบาย */}
                            <section className="space-y-3">
                                <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wider">รายละเอียด</p>
                                <Field label="คำอธิบาย">
                                    <textarea
                                        name="desc"
                                        value={form.desc}
                                        onChange={handleChange}
                                        rows={3}
                                        className={`${inputClass} resize-none`}
                                        placeholder="อธิบายสินค้าสั้นๆ..."
                                    />
                                </Field>
                            </section>

                            {/* โภชนาการ */}
                            <section className="space-y-3">
                                <p className="text-xs font-semibold text-[#8A8780] uppercase tracking-wider">โภชนาการ</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="แคลอรี่ (kcal)">
                                        <input
                                            name="kcal"
                                            type="number"
                                            min="0"
                                            value={form.kcal}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="0"
                                        />
                                    </Field>
                                    <Field label="โปรตีน">
                                        <input
                                            name="protein"
                                            value={form.protein}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="เช่น 40g"
                                        />
                                    </Field>
                                    <Field label="คาร์โบไฮเดรต">
                                        <input
                                            name="carbs"
                                            value={form.carbs}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="เช่น 15g"
                                        />
                                    </Field>
                                    <Field label="ไขมัน">
                                        <input
                                            name="fat"
                                            value={form.fat}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="เช่น 8g"
                                        />
                                    </Field>
                                </div>
                            </section>
                        </form>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-[#DDD9D0] flex justify-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-[#1C1C1A] border border-[#DDD9D0] rounded-lg hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                            >
                                ยกเลิก
                            </button>
                            <button
                                type="submit"
                                form="product-form"
                                disabled={submitting}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#5B8C5A] rounded-lg hover:bg-[#4a7a49] disabled:opacity-50 transition-colors cursor-pointer"
                            >
                                {submitting ? 'กำลังบันทึก...' : modal === 'add' ? 'เพิ่มสินค้า' : 'บันทึกการแก้ไข'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {modal === 'delete' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
                        <h2 className="text-lg font-bold text-[#1C1C1A] mb-2">ยืนยันการลบ</h2>
                        <p className="text-sm text-[#8A8780] mb-1">
                            ต้องการลบสินค้า{' '}
                            <span className="font-semibold text-[#1C1C1A]">
                                "{selectedProduct?.productname}"
                            </span>{' '}
                            ใช่ไหม?
                        </p>
                        <p className="text-xs text-[#C5C1BA] mb-6">
                            สินค้าจะถูก deactivate และไม่แสดงในหน้าร้านค้า
                        </p>
                        {formError && (
                            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {formError}
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-[#1C1C1A] border border-[#DDD9D0] rounded-lg hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={submitting}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors cursor-pointer"
                            >
                                {submitting ? 'กำลังลบ...' : 'ลบสินค้า'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
