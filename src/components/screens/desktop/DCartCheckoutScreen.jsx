import DTopNav from './DTopNav'

const cartItems = [
  { id: 1, name: 'อกไก่ปั่น ข้าวกล้อง', note: 'ไม่เผ็ด', qty: 2, price: 178 },
  { id: 2, name: 'Green Protein Smoothie', note: 'ไม่มีน้ำตาล', qty: 1, price: 79 },
]

const timeSlots = [
  { label: 'เร็วที่สุด', sub: '~45 นาที', active: true },
  { label: '12:00–13:00', sub: '', active: false },
  { label: '13:00–14:00', sub: '', active: false },
  { label: '14:00–15:00', sub: '', active: false },
]

const paymentIcons = ['💳', '🏦', '🍊', '🔴']

export default function DCartCheckoutScreen() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] font-['DM_Sans']">
      <DTopNav />

      <div className="max-w-281.5 mx-auto px-8 py-8 flex gap-7 items-start">
        {/* ───── Left column ───── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <h1 className="text-[16px] font-bold text-[#1C1C1A]">
            ตะกร้าของฉัน ({cartItems.length} รายการ)
          </h1>

          {/* Cart items */}
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#DDD9D0] p-4 flex gap-4 items-center"
              >
                {/* Product image placeholder */}
                <div className="w-16 h-16 rounded-xl bg-[#EDEAE3] shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1C1C1A]">{item.name}</p>
                  <p className="text-[12px] text-[#8A8780] mt-0.5">{item.note}</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-7 h-7 rounded-lg border border-[#DDD9D0] flex items-center justify-center text-[#8A8780] text-[14px] hover:bg-[#EDEAE3]">
                    −
                  </button>
                  <span className="text-[14px] font-bold text-[#1C1C1A] w-5 text-center">
                    {item.qty}
                  </span>
                  <button className="w-7 h-7 rounded-lg bg-[#5B8C5A] flex items-center justify-center text-white text-[14px] hover:bg-[#4a7249]">
                    +
                  </button>
                </div>

                {/* Price + remove */}
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-[14px] font-bold text-[#1C1C1A]">฿{item.price}</span>
                  <button className="text-[12px] text-[#D95B5B] hover:underline">ลบ</button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery address */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#D95B5B] text-[14px]">📍</span>
              <p className="text-[13px] font-semibold text-[#1C1C1A]">ที่อยู่จัดส่ง</p>
            </div>
            <div className="bg-[#EDEAE3] rounded-xl border-[1.5px] border-[#5B8C5A] px-4 py-3 mb-3">
              <p className="text-[12px] font-semibold text-[#1C1C1A]">บ้าน — สมชาย ใจดี</p>
              <p className="text-[12px] text-[#8A8780] mt-0.5">
                123/45 ถ.สุขุมวิท กรุงเทพฯ 10110
              </p>
            </div>
            <button className="text-[12px] text-[#5B8C5A] hover:underline">
              + เพิ่มที่อยู่ใหม่
            </button>
          </div>

          {/* Delivery time */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[14px]">🕐</span>
              <p className="text-[13px] font-semibold text-[#1C1C1A]">เวลาจัดส่ง</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot, i) => (
                <button
                  key={i}
                  className={`rounded-xl py-2.5 px-2 text-center border-[1.5px] transition-colors ${
                    slot.active
                      ? 'bg-[#EAF2EA] border-[#5B8C5A] text-[#3A6439]'
                      : 'bg-white border-[#DDD9D0] text-[#8A8780]'
                  }`}
                >
                  <p className="text-[11px] font-semibold">{slot.label}</p>
                  {slot.sub && <p className="text-[10px] mt-0.5">{slot.sub}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ───── Right column ───── */}
        <div className="w-80 shrink-0 flex flex-col gap-4">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-5">
            <p className="text-[14px] font-bold text-[#1C1C1A] mb-4">สรุปคำสั่งซื้อ</p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ราคาสินค้า</span>
                <span className="text-[13px] text-[#8A8780]">฿257</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ค่าจัดส่ง</span>
                <span className="text-[13px] text-[#8A8780]">฿30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ส่วนลด</span>
                <span className="text-[13px] text-[#8A8780]">-฿0</span>
              </div>
            </div>

            <div className="h-px bg-[#DDD9D0] mb-4" />

            <div className="flex justify-between mb-5">
              <span className="text-[15px] font-bold text-[#1C1C1A]">รวม</span>
              <span className="text-[15px] font-bold text-[#5B8C5A]">฿287</span>
            </div>

            {/* Coupon input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="กรอกส่วนลด"
                className="flex-1 h-10 rounded-xl bg-[#EDEAE3] px-3 text-[13px] text-[#1C1C1A] border-none outline-none placeholder:text-[#8A8780]"
              />
              <button className="h-10 px-4 rounded-xl border-[1.5px] border-[#5B8C5A] text-[#5B8C5A] text-[13px] font-semibold hover:bg-[#EAF2EA] transition-colors">
                ใช้
              </button>
            </div>

            <button className="w-full h-12 rounded-xl bg-[#5B8C5A] text-white text-[14px] font-semibold hover:bg-[#4a7249] transition-colors">
              ดำเนินการชำระเงิน →
            </button>
          </div>

          {/* Payment methods */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] px-5 py-4">
            <p className="text-[12px] font-semibold text-[#8A8780] mb-3">รับชำระผ่าน</p>
            <div className="flex gap-2">
              {paymentIcons.map((icon, i) => (
                <div
                  key={i}
                  className="w-11 h-9 rounded-lg bg-[#EDEAE3] flex items-center justify-center text-[16px]"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
