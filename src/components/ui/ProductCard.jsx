import React from "react";
import { useCart } from "@/context/useCart";

const ProductCard = ({ item, categories = [], onNavigate }) => {
    const { addItem } = useCart();

    const categoryName =
        categories.find((c) => c._id === item.categoryId)?.categoryname ||
        "ทั่วไป";

    return (
        <div
            onClick={() => onNavigate(item._id)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer flex flex-col h-full"
        >
            <div className="h-64 bg-gray-50 relative flex items-center justify-center overflow-hidden p-4">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.productname}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-gray-400 text-xs italic font-serif text-center px-4">
                        [ Image: {item.productname} ]
                    </span>
                )}
                {item.tag && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-black text-white bg-[#5c8254] uppercase tracking-wider shadow-sm">
                        {item.tag}
                    </span>
                )}
            </div>

            {/* ส่วนข้อมูลรายละเอียด */}
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="mb-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            {categoryName}
                        </span>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#5c8254] transition-colors text-lg leading-tight line-clamp-2">
                        {item.productname}
                    </h3>

                    {item.desc && (
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {item.desc}
                        </p>
                    )}

                    <div className="flex gap-1.5 mb-4">
                        {item.kcal && (
                            <span className="bg-[#EAF2EA] text-[10px] font-bold text-[#5c8254] px-2 py-0.5 rounded-md uppercase">
                                {item.kcal} kcal
                            </span>
                        )}
                        {item.protein && (
                            <span className="bg-[#fcf8ef] text-[10px] font-bold text-[#d4a373] px-2 py-0.5 rounded-md uppercase">
                                P {item.protein}g
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-between pt-4 mt-auto border-t border-gray-50">
                    <span className="text-xl font-black text-gray-900 leading-none">
                        ฿{item.price?.toLocaleString()}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(item);
                        }}
                        className="bg-[#5c8254] hover:bg-[#4a6b43] text-white px-5 py-2 rounded-md text-[11px] font-bold tracking-wide transition-all active:scale-95 shadow-sm"
                    >
                        + ตะกร้า
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
