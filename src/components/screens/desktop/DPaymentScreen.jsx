import { useState } from "react";

function DPaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  return (
    <main className="p-6">
      <div className="grid grid-cols-[3fr_1fr] gap-10 ">
        <section className="border-2 space-y-4">
          <h2>เลือกวิธีชำระเงิน</h2>
          <p>ตอนนี้เลือก: {selectedMethod}</p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedMethod("card")}
              className={
                selectedMethod === "card"
                  ? "bg-[#E8F0E8] border-2 border-[#A3B899] rounded-lg p-4 w-full"
                  : "bg-[#EDEAE3] rounded-lg p-4 w-full"
              }
            >
              <p>บัตรเครดิต/เดบิต</p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("q")}
              className={
                selectedMethod === "q"
                  ? "bg-[#E8F0E8] border-2 border-[#A3B899] rounded-lg p-4 w-full"
                  : "bg-[#EDEAE3] rounded-lg p-4 w-full"
              }
            >
              <p>QR/PrompPay</p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("cod")}
              className={
                selectedMethod === "cod"
                  ? "bg-[#E8F0E8] border-2 border-[#A3B899] rounded-lg p-4 w-full"
                  : "bg-[#EDEAE3] rounded-lg p-4 w-full"
              }
            >
              <p>เก็บเงินปลายทาง</p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("wallet")}
              className={
                selectedMethod === "wallet"
                  ? "bg-[#E8F0E8] border-2 border-[#A3B899] rounded-lg p-4 w-full"
                  : "bg-[#EDEAE3] rounded-lg p-4 w-full"
              }
            >
              <p>TrueMoney Wallet</p>
            </button>
          </div>
          <div className="w-full border-2 bg-[#EDEAE3] rounded-lg p-4 grid gap-2 ">
            <h3>ข้อมูลบัตร</h3>
            <div className="grid grid-cols-1 w-full bg-white">
              <input placeholder="💳เลขบัตร" />
            </div>

            <div className="grid grid-cols-2 w-full  gap-x-2 ">
              <input className="bg-white" placeholder="📅MM/YY" />
              <input className="bg-white" placeholder="🔒CVV" />
            </div>
            <div className="grid grid-cols-1 w-full bg-white">
              <input placeholder=" 🤵ชื่อบนบัตร" />
            </div>
          </div>
        </section>
        <aside className="border-2 space-y-4">
          <div>กล่องสรุปคำสั่งซื้อ</div>
          <div>กล่องคิวอาร์โค้ด</div>
        </aside>
      </div>
    </main>
  );
}
export default DPaymentScreen;
