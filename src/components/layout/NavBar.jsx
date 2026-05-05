import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react' // เพิ่มไอคอนเมนู
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false) // สถานะเปิด-ปิดเมนูบนมือถือ

    // ฟังก์ชันกำหนดสไตล์เมนู
    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'border-[#7aaf69] border-b-2 pb-1 font-semibold text-[#72a25f] md:border-b-2'
            : 'text-[#8e8a83] transition hover:text-[#4c4a45]'

    return (
        <nav className="sticky top-0 z-50 border-b border-[#ddd6c8] bg-[#fcfbf8]">
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
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d6d2c7] bg-white shadow-sm font-sans">
                            <span className="text-sm">🥗</span>
                        </div>
                        <span className="text-[15px] font-semibold tracking-wide text-[#202020]">
                            JuicyHealthy
                        </span>
                    </Link>

                    {/* Desktop Navigation (แสดงเมื่อจอใหญ่ขึ้น) */}
                    <div className="hidden md:flex items-center gap-7 text-[13px]">
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

                {/* Right Section (Search & Cart) */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Search Bar - ซ่อนบนมือถือเพื่อประหยัดพื้นที่ หรือจะย่อขนาดลง */}
                    <div className="relative hidden sm:block">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
                        <Input
                            placeholder="ค้นหาเมนู..."
                            className="h-10 w-30 lg:w-42 rounded-xl border-[#e5dfd3] bg-[#ece8df] pr-3 pl-9 text-[12px] text-[#6d675f] shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <Link to="/tracking">
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative h-10 w-10 rounded-xl border-[#e5dfd3] bg-[#f5f2ea] text-[#5b5750] shadow-none"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#de6b6b] px-1 text-[9px] font-semibold text-white">
                                2
                            </span>
                        </Button>
                    </Link>

                    <div className="h-10 w-10 rounded-full bg-[#e9e3d9] cursor-pointer" />
                </div>
            </div>

            {/* Mobile Navigation Drawer (แสดงเมื่อกด Hamburger) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-[#ddd6c8] px-6 py-4 flex flex-col gap-4 text-[14px]">
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

                    {/* เพิ่มช่องค้นหาในเมนูสำหรับมือถือ */}
                    <div className="relative sm:hidden mt-2">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
                        <Input
                            placeholder="ค้นหาเมนู..."
                            className="h-10 w-full rounded-xl border-[#e5dfd3] bg-[#ece8df] pr-3 pl-9 text-[12px] shadow-none focus-visible:ring-0"
                        />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar
