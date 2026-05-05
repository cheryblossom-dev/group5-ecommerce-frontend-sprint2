import { NavLink, Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/customers", label: "Customers" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-55 bg-[#5B8C5A] text-white flex flex-col py-6 shrink-0">
        {/* Title */}
        <div className="px-6 pb-6 border-b border-white/20">
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
            FitFood
          </p>
          <p className="text-xl font-bold mt-1">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `block px-6 py-2.5 text-sm text-white no-underline border-l-[3px] transition-colors ` +
                (isActive
                  ? "font-semibold bg-white/15 border-white"
                  : "font-normal bg-transparent border-transparent hover:bg-white/10")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 text-sm font-medium text-white bg-white/15 border border-white/30 rounded-lg cursor-pointer hover:bg-white/25 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#F8F6F2] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
