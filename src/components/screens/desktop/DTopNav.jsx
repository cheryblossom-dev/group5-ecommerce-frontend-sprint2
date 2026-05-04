const Header = () => {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                    🥗
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-800">
                    JuicyHealthy
                </span>
            </div>

            {/* Main Nav */}
            <div className="hidden md:flex items-center gap-8">
                <a
                    href="#"
                    className="text-gray-500 hover:text-green-600 transition-colors"
                >
                    หน้าหลัก
                </a>
                <a
                    href="#"
                    className="text-green-600 font-medium border-b-2 border-green-600 pb-1"
                >
                    เมนู
                </a>
                <a
                    href="#"
                    className="text-gray-500 hover:text-green-600 transition-colors"
                >
                    Meal Plan
                </a>
                <a
                    href="#"
                    className="text-gray-500 hover:text-green-600 transition-colors"
                >
                    เกี่ยวกับเรา
                </a>
            </div>

            {/* Search & Icons */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="ค้นหาเมนู..."
                        className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 w-64 transition-all"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                        🔍
                    </span>
                </div>

                <button className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    📋
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        2
                    </span>
                </button>

                <div className="w-9 h-9 bg-gray-200 rounded-full border-2 border-white shadow-sm cursor-pointer"></div>
            </div>
        </nav>
    )
}

export default Header
