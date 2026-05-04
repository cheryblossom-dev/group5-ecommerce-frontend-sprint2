const DEtc2Screen = () => {
    const steps = [
        {
            title: 'กำหนดเป้าหมาย',
            desc: 'ระบุว่าต้องการลดน้ำหนัก เพิ่มกล้ามเนื้อ หรือรักษาสุขภาพ',
        },
        {
            title: 'คำนวณแคลอรี่',
            desc: 'หาค่า TDEE เพื่อรู้ปริมาณพลังงานที่ร่างกายต้องการต่อวัน',
        },
        {
            title: 'เลือกเมนูที่สมดุล',
            desc: 'เน้นโปรตีน คาร์โบไฮเดรตเชิงซ้อน และไขมันดี',
        },
    ]

    return (
        <div className="min-h-screen bg-[#fcfcf9] py-12 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-[#e5f0e1] text-[#5c8254] px-4 py-1 rounded-full text-sm font-bold uppercase">
                        Guide
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-800">
                        Meal Plan
                    </h1>
                </div>

                {/* Featured Image */}
                <div className="rounded-[40px] overflow-hidden mb-12 shadow-2xl shadow-gray-200">
                    <img
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200"
                        alt="Healthy meal prep"
                        className="w-full h-112.5 object-cover"
                    />
                </div>

                {/* Article Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            วางแผนการกินอย่างไรให้ยั่งยืน?
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            การทำ Meal Plan ไม่ใช่เรื่องยากอย่างที่คิด
                            หัวใจสำคัญคือ "การเตรียมตัว"
                            เมื่อคุณมีการวางแผนล่วงหน้า
                            คุณจะลดโอกาสการกินอาหารที่ไม่เป็นประโยชน์ลงได้ถึง
                            70%
                        </p>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">
                                3 ขั้นตอนง่ายๆ เริ่มต้น Meal Plan
                            </h3>
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 bg-[#5c8254] text-white rounded-full flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Mini Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#eceae0] p-6 rounded-3xl">
                            <h4 className="font-bold text-gray-800 mb-2">
                                Pro Tip! 💡
                            </h4>
                            <p className="text-sm text-gray-600 italic">
                                "ดื่มน้ำเปล่า 1 แก้วก่อนมื้ออาหาร
                                ช่วยให้ระบบย่อยทำงานได้ดีขึ้นและอิ่มไวขึ้น"
                            </p>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=400"
                            alt="Fresh juice"
                            className="rounded-3xl h-48 w-full object-cover shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DEtc2Screen
