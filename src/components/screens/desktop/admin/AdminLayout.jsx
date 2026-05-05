import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div>
            <nav>
                <NavLink to="/admin">Dashboard</NavLink>
                <NavLink to="/admin/products">Products</NavLink>
                <NavLink to="/admin/orders">Orders</NavLink>
                <NavLink to="/admin/customers">Customers</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
