import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Minus,
    Plus,
    ShoppingBag,
    ShieldCheck,
} from "lucide-react";
import { getProductById } from "@/services/product";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

const DProductDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedQty, setSelectedQty] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const res = await getProductById(id);

                const productData = res.data || res;
                setProduct(productData);

                if (productData.quantity === 0) {
                    setSelectedQty(0);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("ไม่พบข้อมูลสินค้าที่คุณต้องการ");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
        window.scrollTo(0, 0);
    }, [id]);

    const handleIncrement = () => {
        if (selectedQty < product?.quantity) {
            setSelectedQty((prev) => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (selectedQty > 1) {
            setSelectedQty((prev) => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!product || product.quantity === 0) return;

        if (!user) {
            alert("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อสินค้าครับ");
            navigate("/login"); // ดัก guest
            return;
        }

        setIsAdding(true);
        try {
            await addItem({ ...product, selectedQty });

            alert(
                `เพิ่ม "${product.productname}" จำนวน ${selectedQty} ชิ้น ลงตะกร้าเรียบร้อยแล้ว!`,
            );

            navigate("/catalog");
        } catch (err) {
            console.error("Add to cart failed:", err);
            alert("ไม่สามารถเพิ่มสินค้าลงตะกร้าได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsAdding(false);
        }
    };

    if (loading) return <SkeletonLoader />;

    if (error || !product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                    {error}
                </h2>
                <button
                    onClick={() => navigate("/catalog")}
                    className="text-emerald-600 hover:underline font-bold"
                >
                    กลับไปหน้าเมนูอาหาร
                </button>
            </div>
        );
    }

    const isOutOfStock = product.quantity === 0;

    return (
        <div className="min-h-screen bg-stone-50 font-sans pb-20">
            {/* Breadcrumb / Back Button */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors font-bold text-sm"
                >
                    <ChevronLeft size={16} /> ย้อนกลับ
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* left - img */}
                    <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden relative border border-stone-200 flex items-center justify-center">
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                                <span className="bg-rose-500 text-white text-xl font-black px-6 py-2 rounded-xl shadow-lg rotate-[-5deg]">
                                    SOLD OUT
                                </span>
                            </div>
                        )}
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.productname}
                                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                            />
                        ) : (
                            <span className="text-stone-400 font-bold">
                                ไม่มีรูปภาพประกอบ
                            </span>
                        )}
                        {product.tag && (
                            <span className="absolute top-6 left-6 px-3 py-1.5 rounded-lg text-xs font-black text-white bg-emerald-600 uppercase tracking-wider shadow-md z-20">
                                {product.tag}
                            </span>
                        )}
                    </div>

                    {/* right - desc n states */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                            <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">
                                รหัสสินค้า: {product._id.substring(0, 8)}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 leading-tight">
                            {product.productname}
                        </h1>

                        <p className="text-stone-500 text-base mb-6 leading-relaxed">
                            {product.desc || "ไม่มีคำอธิบายสำหรับเมนูนี้"}
                        </p>

                        {/* nutri tag */}
                        <div className="flex flex-wrap gap-2 mb-8 border-y border-stone-100 py-6">
                            {product.kcal > 0 && (
                                <div className="bg-lime-50 border border-lime-100 rounded-xl px-4 py-2 text-center">
                                    <span className="block text-xs text-lime-600 font-bold uppercase mb-1">
                                        Calories
                                    </span>
                                    <span className="block text-lg font-black text-lime-700">
                                        {product.kcal}
                                    </span>
                                </div>
                            )}
                            {product.protein && product.protein !== "0" && (
                                <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 text-center">
                                    <span className="block text-xs text-rose-500 font-bold uppercase mb-1">
                                        Protein
                                    </span>
                                    <span className="block text-lg font-black text-rose-600">
                                        {product.protein.replace(/g/i, "")} g
                                    </span>
                                </div>
                            )}
                            {product.carbs && product.carbs !== "0" && (
                                <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2 text-center">
                                    <span className="block text-xs text-sky-500 font-bold uppercase mb-1">
                                        Carbs
                                    </span>
                                    <span className="block text-lg font-black text-sky-600">
                                        {product.carbs.replace(/g/i, "")} g
                                    </span>
                                </div>
                            )}
                            {product.fat && product.fat !== "0" && (
                                <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2 text-center">
                                    <span className="block text-xs text-orange-400 font-bold uppercase mb-1">
                                        Fat
                                    </span>
                                    <span className="block text-lg font-black text-orange-500">
                                        {product.fat.replace(/g/i, "")} g
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* price n qt */}
                        <div className="mb-8 flex items-end justify-between">
                            <div>
                                <p className="text-sm text-stone-500 font-bold mb-1">
                                    ราคา
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-stone-800">
                                        {product.price?.toLocaleString()} บาท
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-stone-500 font-bold mb-1">
                                    สถานะสินค้า
                                </p>
                                {isOutOfStock ? (
                                    <span className="text-rose-500 font-black">
                                        สินค้าหมดชั่วคราว
                                    </span>
                                ) : (
                                    <span className="text-emerald-600 font-black flex items-center gap-1 justify-end">
                                        <ShieldCheck size={16} /> มีสินค้า (
                                        {product.quantity} ชิ้น)
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Area: qt + addToCart btn */}
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            {/* handle */}
                            <div
                                className={`flex items-center justify-between border-2 rounded-xl p-1 w-full sm:w-36 ${isOutOfStock ? "border-stone-200 bg-stone-100 opacity-50" : "border-stone-200 bg-white"}`}
                            >
                                <button
                                    onClick={handleDecrement}
                                    disabled={isOutOfStock || selectedQty <= 1}
                                    className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="font-black text-lg w-8 text-center">
                                    {selectedQty}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    disabled={
                                        isOutOfStock ||
                                        selectedQty >= product.quantity
                                    }
                                    className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* btn */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock || isAdding}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all shadow-sm
                                    ${
                                        isOutOfStock
                                            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                                            : "bg-stone-800 hover:bg-emerald-600 text-white active:scale-[0.98]"
                                    }`}
                            >
                                <ShoppingBag size={20} />
                                {isOutOfStock
                                    ? "สินค้าหมด"
                                    : isAdding
                                      ? "กำลังหยิบลงตะกร้า..."
                                      : "หยิบลงตะกร้า"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DProductDetailScreen;
