const DEtc1Screen = () => {
    return (
        <div className="min-h-screen bg-[#fcfcf9] py-12 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-800 mb-4">
                        เกี่ยวกับเรา
                    </h1>
                    <div className="w-20 h-1.5 bg-[#5c8254] mx-auto rounded-full"></div>
                </div>

                {/* Hero Image */}
                <div className="rounded-xl overflow-hidden mb-12 shadow-xl shadow-green-900/5">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                        alt="Healthy store background"
                        className="w-full h-100 object-cover"
                    />
                </div>

                {/* Content Section */}
                <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        จุดเริ่มต้นของ Juicy Healthy
                    </h2>
                    <p>
                        ร้าน Juicy Healthy
                        เริ่มต้นจากความตั้งใจที่อยากจะส่งมอบสุขภาพที่ดีให้กับทุกคนในชุมชน
                        เราเชื่อว่า "การกินดีคือพื้นฐานของชีวิตที่มีความสุข"
                        เราจึงคัดสรรวัตถุดิบที่สดใหม่ ออร์แกนิก
                        และปลอดภัยจากเกษตรกรโดยตรง
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                        <img
                            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800"
                            alt="Fresh vegetables"
                            className="rounded-2xl h-64 w-full object-cover"
                        />
                        <div className="flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-[#5c8254] mb-2">
                                ทำไมต้องเป็นเรา?
                            </h3>
                            <p>
                                เราไม่ได้แค่ขายสินค้า
                                แต่เราดูแลตั้งแต่แหล่งที่มาจนถึงมือคุณ
                                ทุกขวดของอกไก่ปั่นและทุกเมนูที่เราทำ
                                ผ่านการคำนวณโภชนาการมาอย่างแม่นยำ
                            </p>
                        </div>
                    </div>

                    <p>
                        ปัจจุบัน Juicy Healthy
                        เติบโตขึ้นจากการสนับสนุนของลูกค้าที่รักสุขภาพ
                        เราสัญญาว่าจะรักษามาตรฐานและพัฒนาเมนูใหม่ๆ
                        เพื่อตอบโจทย์ทุกไลฟ์สไตล์ของ Padawan และ Jedi
                        สายเฮลตี้ทุกคน!
                    </p>
                </article>
            </div>
        </div>
    )
}

export default DEtc1Screen
