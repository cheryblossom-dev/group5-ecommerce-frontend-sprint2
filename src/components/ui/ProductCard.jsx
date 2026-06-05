import React from "react";

const ProductCard = ({ item, categories = [], onNavigate }) => {
    const categoryName =
        categories.find((c) => c._id === item.categoryId)?.categoryname ||
        "ทั่วไป";

    return (
        <div
            onClick={() => onNavigate(item._id)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-[#5c8254]/30 transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
        >
            {/* sold out */}
            <div className="h-56 sm:h-64 bg-white relative flex items-center justify-center overflow-hidden">
                {item.quantity === 0 && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <span className="bg-red-500 text-white font-black px-4 py-1.5 rounded-md text-sm shadow-sm rotate-[-10deg]">
                            สินค้าหมด
                        </span>
                    </div>
                )}

                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.productname}
                        className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${item.quantity === 0 ? "opacity-50 grayscale" : ""}`}
                    />
                ) : (
                    <span className="text-gray-400 text-xs italic font-serif text-center px-4">
                        [ Image: {item.productname} ]
                    </span>
                )}
                {item.tag && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-black text-white bg-[#5c8254] uppercase tracking-wider shadow-sm z-20">
                        {item.tag}
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="mb-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            {categoryName}
                        </span>
                    </div>

                    <h3
                        className={`font-bold mb-2 transition-colors text-lg leading-tight line-clamp-2 ${item.quantity === 0 ? "text-gray-400" : "text-gray-800 group-hover:text-[#5c8254]"}`}
                    >
                        {item.productname}
                    </h3>

                    {item.desc && (
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {item.desc}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.kcal > 0 ? (
                            <span className="font-semibold bg-lime-50 text-xs text-lime-500 px-2 py-0.5 rounded-md">
                                {item.kcal} kcal
                            </span>
                        ) : null}

                        {item.protein &&
                        item.protein !== "0" &&
                        item.protein.toLowerCase() !== "0g" ? (
                            <span className="font-semibold bg-rose-50 text-xs text-rose-500 px-2 py-0.5 rounded-md">
                                Protein {item.protein.replace(/g/i, "")} g
                            </span>
                        ) : null}

                        {item.carbs &&
                        item.carbs !== "0" &&
                        item.carbs.toLowerCase() !== "0g" ? (
                            <span className="font-semibold bg-sky-50 text-xs text-sky-500 px-2 py-0.5 rounded-md">
                                Carbs {item.carbs.replace(/g/i, "")} g
                            </span>
                        ) : null}

                        {item.fat &&
                        item.fat !== "0" &&
                        item.fat.toLowerCase() !== "0g" ? (
                            <span className="font-semibold bg-orange-50 text-xs text-orange-300 px-2 py-0.5 rounded-md">
                                Fat {item.fat.replace(/g/i, "")} g
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50">
                    <span
                        className={`text-xs leading-none ${item.quantity === 0 ? "text-gray-400" : "text-gray-900"}`}
                    >
                        ราคา{" "}
                        <span className="text-xl font-black leading-none">
                            {item.price?.toLocaleString()}
                        </span>{" "}
                        บาท
                    </span>

                    {item.quantity === 0 ? (
                        <span className="text-[11px] font-bold text-red-400 bg-red-50 px-2 py-1 rounded-md">
                            SOLD OUT
                        </span>
                    ) : item.quantity > 0 && item.quantity <= 5 ? (
                        <span className="text-[10px] font-bold text-orange-500 animate-pulse">
                            เหลือเพียง {item.quantity} ชิ้น!
                        </span>
                    ) : (
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#5c8254] transition-colors flex items-center gap-1">
                            ดูรายละเอียด
                            <span className="text-[14px] leading-none transition-transform group-hover:translate-x-1">
                                &rarr;
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
