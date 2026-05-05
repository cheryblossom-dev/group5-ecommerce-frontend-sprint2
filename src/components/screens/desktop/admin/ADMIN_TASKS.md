# Admin Task Plan For Beginner

แนวคิด:
- ลดจำนวน component ให้เหลือเท่าที่จำเป็นก่อน
- เน้นอ่านง่าย แก้ง่าย และต่อยอดง่าย
- ถ้ายังไม่มีข้อมูลจริง ให้ใช้ mock data ไปก่อน
- ยังไม่ต้องรีบแยก component ย่อยเยอะ ๆ

## ⚠️ สำคัญ — Admin ต้องแยก Route ออกจาก App

`App.jsx` มี `DTopNav` + `DFooter` ซึ่งหน้า admin ไม่ควรเห็น
ดังนั้น `/admin` ต้องเพิ่มเป็น **top-level route แยกต่างหาก** ใน `main.jsx`
ไม่ใช่ children ของ `App`

```js
// main.jsx — เพิ่มแยกออกมาจาก { path: '/', element: <App /> }
{
  path: '/admin',
  element: <AdminLayout />,   // AdminLayout มี Outlet ของตัวเอง
  children: [
    { index: true,          element: <AdminDashboard /> },
    { path: 'products',     element: <AdminProducts /> },
    { path: 'orders',       element: <AdminOrders /> },
    { path: 'customers',    element: <AdminCustomers /> },
  ],
},
```

อย่าลืม import component ใหม่ทุกตัวที่เพิ่มเข้าไปด้านบนของ `main.jsx` ด้วย

---

## Component ที่แนะนำให้มีแค่ 4 ตัวก่อน

### `AdminLayout.jsx`
หน้าที่:
- เป็นโครงหลักของหน้า admin (แทน App.jsx สำหรับฝั่ง admin)
- มีเมนูด้านซ้ายหรือด้านบน
- มี `<Outlet />` เพื่อให้ children route แสดงผลตรงนี้

task:
- [ ] สร้าง layout กลางสำหรับ `/admin`
- [ ] ใส่เมนูลิงก์ไป 4 หน้า: Dashboard, Products, Orders, Customers
- [ ] แสดงชื่อระบบ เช่น `Admin Panel`
- [ ] ทำปุ่ม logout แบบง่าย (แค่ `navigate('/')` ไปก่อน)
- [ ] ใส่ `<Outlet />` ในส่วน content

### `AdminDashboard.jsx`
หน้าที่:
- เป็นหน้ารวมข้อมูลสั้น ๆ
- เหมาะกับการเริ่มฝึกจัด layout

task:
- [ ] แสดงการ์ดสรุป 3-4 อัน เช่น ยอดขาย, จำนวนออเดอร์, จำนวนสินค้า
- [ ] แสดงรายการออเดอร์ล่าสุดแบบสั้น ๆ
- [ ] ถ้ายังไม่ทำกราฟ ให้ใช้การ์ดสรุปไปก่อน

### `AdminProducts.jsx`
หน้าที่:
- จัดการสินค้า — นี่คือหัวใจของ e-commerce admin
- ฝึก map ข้อมูล, แสดง list, และ state เบื้องต้น

task:
- [ ] import `products` จาก `src/data/products.js` (มีอยู่แล้ว ไม่ต้องเขียนใหม่)
- [ ] แสดงตารางสินค้า: ชื่อ, ราคา, หมวดหมู่, แคลอรี่
- [ ] ทำปุ่ม "ลบ" สินค้าออกจาก list (ใช้ useState + filter)
- [ ] ทำปุ่ม "เพิ่มสินค้า" แบบง่าย (เปิด form เล็ก ๆ หรือ mock ไปก่อน)

### `AdminOrders.jsx`
หน้าที่:
- ดูรายการคำสั่งซื้อ
- ฝึกทำตาราง, map ข้อมูล, ปุ่ม action

task:
- [ ] สร้าง mock orders ใน `src/data/adminMockData.js` (ดูตัวอย่างด้านล่าง)
- [ ] แสดงตาราง orders: order id, ชื่อลูกค้า, ยอดรวม, status
- [ ] ทำปุ่มเปลี่ยนสถานะง่าย ๆ เช่น `Pending → Shipped`

---

## Component ที่ยังไม่จำเป็นตอนเริ่ม

พักไว้ก่อนได้:
- `AdminCustomers.jsx`
- `AdminAnalytics.jsx`
- `AdminSidebar.jsx`
- `AdminHeader.jsx`
- `AdminDataTable.jsx`
- `AdminStatCard.jsx`
- custom hooks หลายไฟล์
- service แยกหลายชั้น

เหตุผล:
- ถ้าแยกเร็วเกินไป มือใหม่จะงงว่าข้อมูลวิ่งมาจากไหน
- เริ่มจากเขียนตรงในแต่ละหน้า จะเห็นภาพ React ชัดกว่า
- ค่อย refactor ตอนเริ่มมีโค้ดซ้ำ

---

## โครงสร้างไฟล์ที่เหมาะกับมือใหม่

```text
admin/
  AdminLayout.jsx
  AdminDashboard.jsx
  AdminProducts.jsx
  AdminOrders.jsx
  ADMIN_TASKS.md
```

mock data ไว้ที่:

```text
src/data/adminMockData.js
```

ตัวอย่างใน `adminMockData.js`:

```js
export const mockOrders = [
  { id: 'ORD001', customer: 'สมชาย ใจดี', total: 268, status: 'Pending' },
  { id: 'ORD002', customer: 'มานี มีสุข',  total: 178, status: 'Shipped' },
  { id: 'ORD003', customer: 'วิชัย รักดี',  total: 356, status: 'Delivered' },
]

export const mockStats = {
  totalRevenue: 12450,
  totalOrders: 48,
  totalProducts: 12,
}
```

> สำหรับ products ใช้ `import { products } from '@/data/products'` ได้เลย ไม่ต้องเขียน mock ใหม่

---

## ลำดับการทำงานที่ง่ายสุด

1. สร้าง `AdminLayout.jsx` + เพิ่ม route ใน `main.jsx` → เปิด `/admin` ให้ได้ก่อน
2. ทำ `AdminDashboard.jsx` ด้วย mock stats
3. ทำ `AdminProducts.jsx` โดย import products จาก `src/data/products.js`
4. ทำ `AdminOrders.jsx` ด้วย mockOrders
5. ถ้ามีเวลา ค่อยเพิ่ม filter, search, AdminCustomers

## กฎง่าย ๆ สำหรับมือใหม่

- 1 หน้า = 1 component ไปก่อน
- อย่าเพิ่งแยก component ย่อย ถ้ายังไม่ได้ใช้ซ้ำ
- อย่าเพิ่งทำกราฟ ถ้ายังทำ table ไม่คล่อง
- ใช้ mock data ก่อน ไม่ต้องรีบต่อ API
- ทำให้แสดงผลได้ก่อน แล้วค่อยทำให้สวย

---

## MVP ที่ควรได้

ถ้าจะเอาแบบพอดีและทำเสร็จไว:
- [ ] เพิ่ม route `/admin` ใน `main.jsx` แยกจาก App
- [ ] มี `AdminLayout.jsx` ใช้งานได้
- [ ] มีหน้า dashboard แสดงการ์ดสรุป
- [ ] มีหน้า products แสดงรายการสินค้า + ลบได้
- [ ] มีหน้า orders แสดงตาราง + เปลี่ยน status ได้
- [ ] ใช้ mock data แสดงผลครบ

## ค่อยเพิ่มทีหลัง

หลังจาก 4 หน้าแรกเสร็จแล้ว ค่อยเพิ่ม:
- [ ] `AdminCustomers.jsx` — แสดงชื่อ, email, จำนวนออเดอร์, ค้นหาชื่อได้
- [ ] `AdminAnalytics.jsx`
- [ ] filter / search ที่ละเอียดขึ้น
- [ ] modal ดูรายละเอียด
- [ ] protected route (ถ้าจะทำ login จริง)
- [ ] component ย่อยที่ใช้ซ้ำจริง
