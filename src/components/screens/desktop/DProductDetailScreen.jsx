import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/services/product";
import { useCart } from "@/context/useCart";

const DProductDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addItem, items } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getProductById(id);
                setProduct(res.data || res);
            } catch (err) {
                console.error("Error fetching product detail:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
                <p className="text-gray-400 font-bold">กำลังโหลด...</p>
            </div>
        );

    if (error || !product)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F2]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    ไม่พบสินค้า
                </h2>
                <button
                    onClick={() => navigate("/catalog")}
                    className="text-[#5c8254] font-bold hover:underline"
                >
                    กลับไปหน้าเมนู
                </button>
            </div>
        );

    // หาว่าสินค้านี้ มีอยู่ในตะกร้าแล้วกี่ชิ้น?
    const itemInCart = items?.find((i) => i._id === product?._id);
    const qtyInCart = itemInCart ? itemInCart.qty : 0;

    // โควต้าที่กดเพิ่มได้ = สต๊อกทั้งหมด - จำนวนที่อยู่ในตะกร้าแล้ว
    const availableStock =
        (product?.quantity !== undefined ? product.quantity : 99) - qtyInCart;

    const nutrition = [
        { label: "แคลอรี่", value: product.kcal ?? "-", unit: "kcal" },
        {
            label: "โปรตีน",
            value: product.protein?.replace(/g/i, "") ?? "-",
            unit: "g",
        },
        {
            label: "คาร์บ",
            value: product.carbs?.replace(/g/i, "") ?? "-",
            unit: "g",
        },
        {
            label: "ไขมัน",
            value: product.fat?.replace(/g/i, "") ?? "-",
            unit: "g",
        },
    ];

    const handleAddToCart = () => {
        addItem({
            ...product,
            selectedQty: quantity,
            dbStock: product.quantity !== undefined ? product.quantity : 99,
        });

        setQuantity(1);
    };

    return (
        <div className="min-h-screen bg-[#F8F6F2] px-4 md:px-8 py-8 md:py-12 w-full overflow-x-hidden">
            <div className="max-w-281.5 mx-auto">
                <button
                    onClick={() => navigate("/catalog")}
                    className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-6 font-bold text-sm cursor-pointer"
                >
                    <span>←</span> ย้อนกลับไปหน้าเมนู
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Image Gallery */}
                    <div className="w-full mx-auto lg:mx-0 space-y-4">
                        <div className="aspect-square bg-[#ebeae4] rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden p-6 relative">
                            {/* แสดงป้ายเตือนถ้าของหมด */}
                            {availableStock === 0 && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                                    <span className="bg-red-500 text-white font-black px-6 py-2 rounded-full text-lg shadow-lg rotate-[-10deg]">
                                        สินค้าหมดแล้ว
                                    </span>
                                </div>
                            )}

                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.productname}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm italic text-center px-4">
                                    📷 รูปอาหาร – {product.productname}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col w-full h-full">
                        <div className="flex gap-2 mb-4">
                            {product.tag ? (
                                <span className="bg-[#5c8254] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {product.tag}
                                </span>
                            ) : (
                                <span className="bg-[#eceae0] text-gray-600 px-3 py-1 rounded-full text-xs font-bold italic">
                                    Clean Food
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-black text-gray-800 mb-2 leading-tight">
                            {product.productname}
                        </h1>
                        <p className="text-2xl font-black text-[#5c8254] mb-6">
                            ฿{product.price?.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            {product.desc}
                        </p>

                        {/* Nutrition Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
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

                        {product.quantity > 0 ? (
                            <span className="text-sm font-bold text-stone-500 mb-2">
                                🛒 เหลือเพียง {product.quantity} ชิ้น
                            </span>
                        ) : (
                            <span className="text-sm font-bold text-red-500 mb-2">
                                ❌ สินค้าหมด
                            </span>
                        )}

                        {/* Actions */}
                        <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <div className="flex items-center justify-between w-full sm:w-auto bg-[#eceae0] rounded-xl px-4 py-3 gap-6">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="text-gray-600 hover:text-gray-800 font-bold text-xl px-2"
                                >
                                    −
                                </button>
                                <span className="font-bold text-gray-800 w-4 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        setQuantity(
                                            Math.min(
                                                availableStock,
                                                quantity + 1,
                                            ),
                                        )
                                    }
                                    disabled={quantity >= availableStock}
                                    className={`text-xl px-2 font-bold ${
                                        quantity >= availableStock
                                            ? "text-gray-200 cursor-not-allowed"
                                            : "text-gray-400 hover:text-gray-800"
                                    }`}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={availableStock === 0}
                                className={`w-full sm:flex-1 py-4 rounded-2xl font-bold transition-all shadow-md 
                                ${
                                    availableStock === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-[#5c8254] hover:bg-[#4a6b43] text-white active:scale-95"
                                }`}
                            >
                                {availableStock === 0
                                    ? "สินค้าถูกจอง หรือ หมดแล้ว"
                                    : `เพิ่มลงตะกร้า — ฿${(product.price * quantity).toLocaleString()}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DProductDetailScreen;
