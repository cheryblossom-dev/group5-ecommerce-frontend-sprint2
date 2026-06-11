import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, User, LogOut, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { items } = useCart();

  const { user, handleLogout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // ปิดเมนูโปรไฟล์เมื่อคลิก/แตะนอกเมนู (dropdown เปิดด้วย click ไม่ใช่ hover แล้ว)
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isProfileOpen]);

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  const onLogout = () => {
    if (handleLogout) handleLogout();
    navigate("/");
  };

  function handleSearch(e) {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "border-[#7aaf69] border-b-2 pb-1 font-semibold text-[#5B8C5A]"
      : "text-[#8e8a83] transition hover:text-[#4c4a45]";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#ddd6c8] bg-[#fcfbf8] font-sans">
      <div className="mx-auto flex max-w-281.5 items-center justify-between px-4 md:px-8 py-3">
        <div className="flex items-center gap-4 md:gap-10">
          {/* Hamburger Menu (Mobile Only) */}
          <button
            className="md:hidden p-1 text-[#8e8a83]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d6d2c7] bg-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="26"
                height="26"
                role="img"
                aria-label="JuicyHealthy"
              >
                <defs>
                  <clipPath id="jh-citrus">
                    <path d="M24.4 37 C35 29.5 38.5 21.5 34.5 14.5 C27.5 13 24 19 24.4 27 Z" />
                  </clipPath>
                </defs>
                <path
                  d="M23.6 37 C13 29.5 9.5 21.5 13.5 14.5 C20.5 13 24 19 23.6 27 Z"
                  fill="#2F9E57"
                />
                <path
                  d="M24.4 37 C35 29.5 38.5 21.5 34.5 14.5 C27.5 13 24 19 24.4 27 Z"
                  fill="#F5A12E"
                />
                <g
                  clipPath="url(#jh-citrus)"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.92"
                >
                  <line x1="24" y1="36" x2="29" y2="17" />
                  <line x1="24" y1="36" x2="33" y2="20" />
                  <line x1="24" y1="36" x2="35" y2="25" />
                  <line x1="24" y1="36" x2="34" y2="30" />
                </g>
                <path
                  d="M23.6 37 C20.5 31 18 25.5 15.5 19.5"
                  stroke="#ffffff"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.5"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-wide">
              <span className="text-[#202020]">Juicy</span>
              <span className="text-[#2F9E57]">Healthy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-bold">
            <NavLink to="/" className={navLinkClass}>
              หน้าหลัก
            </NavLink>
            <NavLink to="/catalog" className={navLinkClass}>
              เมนู
            </NavLink>
            <NavLink to="/bmi" className={navLinkClass}>
              BMI & TDEE
            </NavLink>
            <NavLink to="/etc2" className={navLinkClass}>
              Meal Plan
            </NavLink>
            <NavLink to="/etc1" className={navLinkClass}>
              เกี่ยวกับเรา
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar (Desktop) */}
          <div className="relative hidden sm:block">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
            <Input
              placeholder="ค้นหาเมนู..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="h-10 w-30 lg:w-42 rounded-xl border-[#e5dfd3] bg-[#ece8df] pr-3 pl-9 text-[12px] shadow-none focus-visible:ring-0"
            />
          </div>

          <Link to="/cart">
            <Button
              variant="outline"
              size="icon"
              className="relative h-10 w-10 rounded-xl border-[#e5dfd3] bg-[#f5f2ea] text-[#5b5750] shadow-none"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#de6b6b] px-1 text-[9px] font-bold text-white">
                  {totalQty}
                </span>
              )}
            </Button>
          </Link>

          {/* 💡 ส่วนแสดงผล User Profile ถ้าล็อกอินแล้ว */}
          {user ? (
            <div ref={profileRef} className="flex items-center gap-3 relative">
              <div className="hidden md:block text-right">
                {/* โชว์ชื่อจาก Database */}
                <p className="text-[11px] font-black text-[#202020] leading-none">
                  {user.firstname || user.username || "Member"}
                </p>
                {/* โชว์ Role ว่าเป็น User หรือ Admin */}
                <p className="text-[9px] text-[#5B8C5A] font-bold uppercase tracking-tighter">
                  {user.role === "admin" ? "Admin" : "Member"}
                </p>
              </div>

              <div
                onClick={() => setIsProfileOpen((open) => !open)}
                className="h-10 w-10 rounded-full bg-[#5c8254] border-2 border-white shadow-md flex items-center justify-center overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-black text-sm uppercase">
                    {(user.firstname || user.username || "M").charAt(0)}
                  </span>
                )}
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-2 w-36 bg-white border border-[#e5dfd3] rounded-lg shadow-xl transition-all z-50 overflow-hidden ${
                  isProfileOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {user.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-[#5b5750] hover:bg-[#f5f2ea] transition-colors border-b border-[#e5dfd3]"
                  >
                    <User size={14} /> จัดการร้าน
                  </button>
                )}

                <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-[#5b5750] hover:bg-[#f5f2ea] transition-colors border-b border-[#e5dfd3]"
                >
                    <Settings size={14} /> แก้ไขโปรไฟล์
                </Link>

                <Link
                    to="/tracking"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-[#5b5750] hover:bg-[#f5f2ea] transition-colors border-b border-[#e5dfd3]"
                >
                    <MapPin size={14} /> ติดตามคำสั่งซื้อ
                </Link>

                <button
                  onClick={() => {
                    onLogout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} /> ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            // ถ้ายังไม่ล็อกอิน โชว์ปุ่มรูปคนนำไปหน้า Login
            <Link to="/login">
              <div className="h-10 w-10 rounded-full bg-[#e9e3d9] hover:bg-[#ddd6c8] transition-colors flex items-center justify-center text-[#8e8a83] cursor-pointer shadow-sm">
                <User size={18} />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#ddd6c8] px-6 py-4 flex flex-col gap-4 text-[14px] font-bold animate-in fade-in slide-in-from-top-2">
          <div className="relative mb-2">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
            <Input
              placeholder="ค้นหาเมนู..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="h-12 w-full rounded-xl border-[#e5dfd3] bg-[#ece8df] pr-3 pl-10 text-[14px] shadow-none focus-visible:ring-0"
            />
          </div>

          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            หน้าหลัก
          </NavLink>
          <NavLink
            to="/catalog"
            className={navLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            เมนู
          </NavLink>
          <NavLink
            to="/bmi"
            className={navLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            BMI & TDEE
          </NavLink>
          <NavLink
            to="/etc2"
            className={navLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Meal Plan
          </NavLink>
          <NavLink
            to="/etc1"
            className={navLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            เกี่ยวกับเรา
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
