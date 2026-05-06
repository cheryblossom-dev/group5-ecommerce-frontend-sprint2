export const mockStats = {
  totalRevenue: 12450,
  totalOrders: 48,
  totalProducts: 20,
}

export const mockOrders = [
  { id: 'ORD001', customer: 'สมชาย ใจดี',   total: 268, status: 'Pending' },
  { id: 'ORD002', customer: 'มานี มีสุข',    total: 178, status: 'Shipped' },
  { id: 'ORD003', customer: 'วิชัย รักดี',   total: 356, status: 'Delivered' },
  { id: 'ORD004', customer: 'สุดา แสนสุข',   total: 420, status: 'Pending' },
  { id: 'ORD005', customer: 'ประยุทธ์ ดีงาม', total: 135, status: 'Shipped' },
]

export const mockCustomers = [
  { id: 'USR001', name: 'สมชาย ใจดี',    email: 'somchai@email.com',   orders: 5, totalSpent: 1268 },
  { id: 'USR002', name: 'มานี มีสุข',     email: 'manee@email.com',     orders: 3, totalSpent:  534 },
  { id: 'USR003', name: 'วิชัย รักดี',    email: 'wichai@email.com',    orders: 8, totalSpent: 2840 },
  { id: 'USR004', name: 'สุดา แสนสุข',    email: 'suda@email.com',      orders: 2, totalSpent:  420 },
  { id: 'USR005', name: 'ประยุทธ์ ดีงาม', email: 'prayuth@email.com',   orders: 6, totalSpent: 1575 },
  { id: 'USR006', name: 'ลลิตา สวัสดี',   email: 'lalita@email.com',    orders: 1, totalSpent:  178 },
]
