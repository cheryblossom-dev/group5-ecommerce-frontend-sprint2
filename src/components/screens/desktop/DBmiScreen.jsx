import { useState } from "react";

const DBmiScreen = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");

  const [bmi, setBmi] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [result, setResult] = useState("");

  const calculateHealth = () => {
    if (!weight || !height || !age) return;

    const h = Number(height) / 100;
    const bmiValue = (Number(weight) / (h * h)).toFixed(1);

    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setResult("น้ำหนักน้อย");
    } else if (bmiValue < 25) {
      setResult("น้ำหนักปกติ");
    } else if (bmiValue < 30) {
      setResult("น้ำหนักเกิน");
    } else {
      setResult("โรคอ้วน");
    }

    let bmr;

    if (gender === "male") {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }

    const tdeeValue = Math.round(bmr * Number(activity));
    setTdee(tdeeValue);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex justify-center items-center p-8">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-black text-center text-[#5c8254] mb-2">
          BMI & TDEE Calculator
        </h1>

        <p className="text-center text-gray-500 mb-8">คำนวณ BMI และ TDEE</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">เพศ</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
            >
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">อายุ (ปี)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              placeholder="เช่น 25"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">น้ำหนัก (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              placeholder="เช่น 70"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">ส่วนสูง (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              placeholder="เช่น 175"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">ระดับกิจกรรม</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
            >
              <option value="1.2">ไม่ออกกำลังกาย</option>
              <option value="1.375">ออกกำลังกาย 1-3 วัน/สัปดาห์</option>
              <option value="1.55">ออกกำลังกาย 3-5 วัน/สัปดาห์</option>
              <option value="1.725">ออกกำลังกาย 6-7 วัน/สัปดาห์</option>
              <option value="1.9">ออกกำลังกายหนักมาก</option>
            </select>
          </div>

          <button
            onClick={calculateHealth}
            className="w-full bg-[#5c8254] hover:bg-[#4a6b43] text-white py-3 rounded-xl font-bold"
          >
            คำนวณ
          </button>
        </div>

        {bmi && (
          <div className="mt-8 bg-[#e5f0e1] rounded-2xl p-5">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">BMI ของคุณ</p>

              <h2 className="text-5xl font-black text-[#5c8254]">{bmi}</h2>

              <p className="mt-3 font-bold text-gray-700">{result}</p>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-center text-sm text-gray-500">
                TDEE (พลังงานที่ใช้ต่อวัน)
              </p>

              <h3 className="text-center text-3xl font-black text-[#5c8254] mt-2">
                {tdee} kcal
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DBmiScreen;
