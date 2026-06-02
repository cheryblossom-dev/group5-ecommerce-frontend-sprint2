import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/useCart";

const NavBar = () => {
    const navigate = useNavigate();
    const { items } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

    function handleSearch(e) {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setIsMenuOpen(false);
        }
    }

    // for test only -- delete next phase
    const [user, setUser] = useState({
        name: "สมตูน คูณห้าร้อย",
        image: null,
    });

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
                            <span className="text-sm">🥗</span>
                        </div>
                        <span className="text-[15px] font-bold tracking-wide text-[#202020]">
                            JuicyHealthy
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

                    {/* Login / Profile Logic */}
                    {user ? (
                        <div className="flex items-center gap-3 group relative">
                            <div className="hidden md:block text-right">
                                <p className="text-[11px] font-black text-[#202020] leading-none">
                                    {user.name}
                                </p>
                                <p className="text-[9px] text-[#5B8C5A] font-bold uppercase tracking-tighter">
                                    Member
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-full bg-[#5c8254] border-2 border-white shadow-md flex items-center justify-center overflow-hidden cursor-pointer transition-transform group-hover:scale-105">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-black text-sm">
                                        {user.name.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-[#e5dfd3] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                                <button
                                    onClick={() => setUser(null)}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={14} /> ออกจากระบบ
                                </button>
                            </div>
                        </div>
                    ) : (
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
                    {/* Mobile Search Bar */}
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
