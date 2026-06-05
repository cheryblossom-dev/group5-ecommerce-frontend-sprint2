import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";
import { SHIPPING_FEE } from "@/data/cart";
import { createOrder } from "@/services/order";

const PAYMENT_METHOD_MAP = {
  card: "Bank transfer",
  q: "Bank transfer",
  cod: "Cash on Delivery",
  wallet: "Bank transfer",
};

function DPaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { subtotal, total, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [formData, setFormData] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addressId = location.state?.addressId;

  useEffect(() => {
    if (!addressId) navigate("/cart", { replace: true });
  }, [addressId, navigate]);

  const methods = [
    { id: "card", label: "บัตรเครดิต/เดบิต" },
    { id: "q", label: "QR/PromptPay" },
    { id: "cod", label: "เก็บเงินปลายทาง" },
    { id: "wallet", label: "TrueMoney Wallet" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    if (selectedMethod !== "card") return {};
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "กรุณากรอกเลขบัตร";
    if (!formData.expiry.trim()) newErrors.expiry = "กรุณากรอกวันหมดอายุ";
    if (!formData.cvv.trim()) newErrors.cvv = "กรุณากรอก CVV";
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อบนบัตร";
    return newErrors;
  }

  async function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await createOrder({
        addressId,
        paymentMethod: PAYMENT_METHOD_MAP[selectedMethod],
      });
      await clearCart();
      setSubmitted(true);
      navigate("/tracking");
    } catch (err) {
      setSubmitError(err?.message ?? "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="p-6 flex items-center justify-center min-h-100">
        <div className="text-center space-y-3">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-bold" style={{ color: "#3A6439" }}>ชำระเงินสำเร็จ</h2>
          <p style={{ color: "#8A8780" }}>คำสั่งซื้อของคุณได้รับการยืนยันแล้ว</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#5B8C5A" }}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="grid grid-cols-[3fr_1fr] gap-10">
        <section className="border-2 space-y-4 p-4">
          <h2 className="font-bold text-lg">เลือกวิธีชำระเงิน</h2>

          <div className="grid grid-cols-2 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMethod(m.id)}
                className="rounded-lg p-4 w-full border-2 transition-colors"
                style={{
                  backgroundColor: selectedMethod === m.id ? "#EAF2EA" : "#EDEAE3",
                  borderColor: selectedMethod === m.id ? "#5B8C5A" : "transparent",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {selectedMethod === "card" && (
            <div className="rounded-lg p-4 grid gap-3" style={{ backgroundColor: "#EDEAE3" }}>
              <h3 className="font-semibold">ข้อมูลบัตร</h3>

              <div>
                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="💳 เลขบัตร"
                  className="w-full bg-white px-3 py-2 rounded border"
                />
                {errors.cardNumber && <p className="text-sm mt-1" style={{ color: "#D95B5B" }}>{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="📅 MM/YY"
                    className="w-full bg-white px-3 py-2 rounded border"
                  />
                  {errors.expiry && <p className="text-sm mt-1" style={{ color: "#D95B5B" }}>{errors.expiry}</p>}
                </div>
                <div>
                  <input
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="🔒 CVV"
                    className="w-full bg-white px-3 py-2 rounded border"
                  />
                  {errors.cvv && <p className="text-sm mt-1" style={{ color: "#D95B5B" }}>{errors.cvv}</p>}
                </div>
              </div>

              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="🤵 ชื่อบนบัตร"
                  className="w-full bg-white px-3 py-2 rounded border"
                />
                {errors.name && <p className="text-sm mt-1" style={{ color: "#D95B5B" }}>{errors.name}</p>}
              </div>
            </div>
          )}

          {selectedMethod === "q" && (
            <div className="rounded-lg p-6 flex flex-col items-center gap-3" style={{ backgroundColor: "#EDEAE3" }}>
              <h3 className="font-semibold">สแกน QR เพื่อชำระเงิน</h3>
              <div className="w-40 h-40 bg-white border-2 flex items-center justify-center rounded">
                <p style={{ color: "#8A8780" }} className="text-sm">QR Code</p>
              </div>
              <p className="text-sm" style={{ color: "#8A8780" }}>PromptPay: 098-765-4321</p>
            </div>
          )}

          {(selectedMethod === "cod" || selectedMethod === "wallet") && (
            <div className="rounded-lg p-4" style={{ backgroundColor: "#EDEAE3" }}>
              <p style={{ color: "#8A8780" }}>
                {selectedMethod === "cod"
                  ? "ชำระเงินเมื่อได้รับสินค้า — ไม่ต้องกรอกข้อมูลเพิ่มเติม"
                  : "ระบบจะส่ง link ไปยัง TrueMoney Wallet ของคุณหลังยืนยัน"}
              </p>
            </div>
          )}

          {submitError && (
            <p className="text-sm text-center" style={{ color: "#D95B5B" }}>{submitError}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-lg text-white font-semibold disabled:opacity-60"
            style={{ backgroundColor: "#5B8C5A" }}
          >
            {submitting ? "กำลังดำเนินการ..." : `ยืนยันชำระเงิน ฿${total}`}
          </button>
        </section>

        <aside className="space-y-4">
          <div className="border-2 rounded-lg p-4 space-y-2" style={{ backgroundColor: "#EDEAE3" }}>
            <h3 className="font-bold">สรุปคำสั่งซื้อ</h3>
            <div className="flex justify-between">
              <p>สินค้า</p>
              <p>฿{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>ค่าจัดส่ง</p>
              <p>฿{SHIPPING_FEE}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <p>รวมทั้งหมด</p>
              <p>฿{total}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default DPaymentScreen;
