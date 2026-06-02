import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import ProductCard from "@/components/ui/ProductCard";

const DCatalogScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClearFilters = () => {
        setSelectedCategory("");
        if (searchQuery) {
            navigate(location.pathname);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data || res || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getProducts(
                    searchQuery,
                    selectedCategory,
                );
                setProductList(response.data || response || []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("ไม่สามารถโหลดข้อมูลสินค้าได้ในขณะนี้");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, selectedCategory]);

    const getActiveCategoryName = () => {
        if (searchQuery) return `ผลการค้นหา "${searchQuery}"`;
        if (!selectedCategory) return "รายการสินค้าทั้งหมด";
        const found = categories.find((c) => c._id === selectedCategory);
        return found ? found.categoryname : "รายการสินค้า";
    };

    return (
        <div className="bg-[#F8F6F2] min-h-screen font-sans flex flex-col items-center w-full min-w-full overflow-x-hidden">
            {/* --- Filter Bar --- */}
            <div className="sticky top-0 z-30 w-full bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#ddd6c8] shadow-sm">
                <div className="w-full max-w-281.5 mx-auto px-4 md:px-8 py-3 flex flex-wrap justify-center gap-2 items-center">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`shrink-0 px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-lg text-[11px] md:text-sm font-bold transition-all border whitespace-nowrap ${
                            selectedCategory === ""
                                ? "bg-[#5c8254] text-white border-[#5c8254] shadow-sm"
                                : "bg-white text-[#8e8a83] border-[#eee7db] hover:border-[#5c8254] hover:text-[#5c8254]"
                        }`}
                    >
                        ทั้งหมด
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setSelectedCategory(cat._id)}
                            className={`shrink-0 px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-lg text-[11px] md:text-sm font-bold transition-all border whitespace-nowrap ${
                                selectedCategory === cat._id
                                    ? "bg-[#5c8254] text-white border-[#5c8254] shadow-sm"
                                    : "bg-white text-[#8e8a83] border-[#eee7db] hover:border-[#5c8254] hover:text-[#5c8254]"
                            }`}
                        >
                            {cat.categoryname}
                        </button>
                    ))}

                    <div className="w-1 shrink-0 md:hidden"></div>
                </div>
            </div>

            {/* --- Main Content --- */}

            <main className="w-full max-w-full mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-3 md:gap-4">
                    <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
                        <h1 className="text-xl md:text-3xl font-black text-gray-800">
                            {getActiveCategoryName()}
                        </h1>
                        <span className="text-sm md:text-base font-bold text-gray-400">
                            {productList.length} เมนู
                        </span>

                        {(searchQuery || selectedCategory !== "") && (
                            <button
                                onClick={handleClearFilters}
                                className="ml-1 md:ml-2 flex items-center gap-1 bg-[#ebeae4] text-gray-500 hover:bg-[#e2e1d8] hover:text-gray-800 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold transition-colors"
                            >
                                ✕ ล้างตัวกรอง
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 font-bold mb-4 bg-red-50 p-4 rounded-xl border border-red-100 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {isLoading &&
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm animate-pulse flex flex-col h-full"
                            >
                                <div className="w-full h-48 md:h-56 bg-gray-100 rounded-xl mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-3"></div>
                                <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded-full w-full mb-6"></div>
                                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                                    <div className="h-5 md:h-6 bg-gray-200 rounded-full w-1/4"></div>
                                    <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
                                </div>
                            </div>
                        ))}

                    {!isLoading &&
                        !error &&
                        productList.map((item) => (
                            <ProductCard
                                key={item._id || item.id}
                                item={item}
                                categories={categories}
                                onNavigate={(id) => navigate(`/product/${id}`)}
                            />
                        ))}
                </div>

                {!isLoading && !error && productList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 md:py-32 bg-white/50 rounded-2xl border border-[#ddd6c8] border-dashed mt-6 md:mt-8">
                        <span className="text-5xl md:text-6xl mb-4">🔍</span>
                        <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-2 text-center">
                            ไม่พบสินค้าในหมวดหมู่นี้
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm text-center px-4">
                            ลองเปลี่ยนตัวกรอง หรือล้างการค้นหาดูอีกครั้ง
                        </p>
                        <button
                            onClick={handleClearFilters}
                            className="mt-6 bg-[#5c8254] hover:bg-[#4a6b43] text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                        >
                            ดูสินค้าทั้งหมด
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DCatalogScreen;
