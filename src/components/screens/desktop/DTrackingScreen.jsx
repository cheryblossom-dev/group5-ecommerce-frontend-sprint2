import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  MapPinned,
  MessageSquareText,
  Phone,
  Search,
  ShoppingBag,
} from "lucide-react";

const trackingSteps = [
  { label: "รับคำสั่งซื้อแล้ว", time: "10:32", done: true },
  { label: "กำลังเตรียมอาหาร", time: "10:35", done: true },
  { label: "ไรเดอร์รับออเดอร์แล้ว", time: "10:50", done: true },
  { label: "กำลังจัดส่ง", time: "~11:20", active: true },
  { label: "ส่งถึงแล้ว", time: "ประมาณ 11:35" },
];

const orderItems = [
  { name: "อกไก่ปั่น ข้าวกล้อง x2", price: "฿178" },
  { name: "Green Protein Smoothie x1", price: "฿79" },
  { name: "ค่าส่ง", price: "฿30" },
];

export default function DTrackingScreen() {
  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#2d2a26]">
      

      <main className="mx-auto grid max-w-[1126px] grid-cols-[1fr_300px] gap-7 px-8 py-6">
        <section className="space-y-4">
          <Card className="rounded-[20px] border-[#e7e1d7] bg-[#eef6ea] py-0 shadow-none">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5f9655] text-white">
                <Check className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h2 className="m-0 text-[24px] font-semibold text-[#3d6c36]">
                  สั่งซื้อสำเร็จ!
                </h2>
                <p className="text-[12px] italic text-[#7f9675]">
                  คำสั่งซื้อ #HR240923-0011 • วันนี้ 10:32
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[20px] border border-dashed border-[#ddd4c5] bg-[#ece7df] py-0 shadow-none">
            <CardContent className="flex h-[232px] items-center justify-center p-6">
              <div className="flex items-center gap-2 text-[12px] text-[#8c8477]">
                <MapPinned className="h-4 w-4 text-[#6fa06a]" />
                <span>
                  แผนที่แสดงตำแหน่งไรเดอร์ <em>real-time</em>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-[#e2dbcf] bg-white py-0 shadow-none">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 bg-[#ece7de]">
                  <AvatarFallback className="bg-[#ece7de] text-[#948f87]">
                    สน
                  </AvatarFallback>
                </Avatar>

                <div className="text-left">
                  <p className="text-[14px] font-semibold text-[#2b2924]">
                    สมศักดิ์ เร็วแรง - ไรเดอร์
                  </p>
                  <p className="text-[11px] italic text-[#999184]">
                    Honda PCX สีขาว - กบท 9999
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="h-9 w-9 rounded-xl border-[#e2dbcf] bg-[#f4f0e8] text-[#c85d45] shadow-none"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="h-9 w-9 rounded-xl border-[#e2dbcf] bg-[#f4f0e8] text-[#605a52] shadow-none"
                >
                  <MessageSquareText className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card className="rounded-[18px] border-[#ddd6c8] bg-white py-0 shadow-none">
            <CardContent className="p-5">
              <h3 className="mb-4 text-left text-[16px] font-semibold text-[#23211d]">
                สถานะการจัดส่ง
              </h3>

              <div className="space-y-0">
                {trackingSteps.map((step, index) => {
                  const isLast = index === trackingSteps.length - 1;

                  return (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex w-5 flex-col items-center">
                        <div
                          className={[
                            "z-10 flex h-5 w-5 items-center justify-center rounded-full border",
                            step.done
                              ? "border-[#6da15c] bg-[#6da15c] text-white"
                              : step.active
                                ? "border-[3px] border-[#6da15c] bg-[#f8f6f1] text-[#6da15c]"
                                : "border-[#d9d1c3] bg-[#f2eee6] text-transparent",
                          ].join(" ")}
                        >
                          {step.done ? <Check className="h-3 w-3" /> : <span>•</span>}
                        </div>
                        {!isLast && (
                          <div className="h-9 w-px bg-[#d7d1c5]" />
                        )}
                      </div>

                      <div className="pb-4 text-left">
                        <p
                          className={[
                            "text-[13px]",
                            step.active
                              ? "font-semibold text-[#2d2a26]"
                              : step.done
                                ? "font-medium text-[#4a483f]"
                                : "text-[#a39d92]",
                          ].join(" ")}
                        >
                          {step.label}
                        </p>
                        <p className="text-[11px] text-[#aaa295]">{step.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-[#ddd6c8] bg-white py-0 shadow-none">
            <CardContent className="space-y-3 p-5">
              <h3 className="text-left text-[16px] font-semibold text-[#23211d]">
                รายการสั่งซื้อ
              </h3>

              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 text-[13px] text-[#857e72]"
                  >
                    <span className="text-left">{item.name}</span>
                    <span className="shrink-0 text-[#4d493f]">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[#eee7db] pt-3">
                <span className="text-[14px] font-semibold text-[#2c2925]">รวม</span>
                <span className="text-[28px] font-bold leading-none text-[#6da15c]">
                  ฿287
                </span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
