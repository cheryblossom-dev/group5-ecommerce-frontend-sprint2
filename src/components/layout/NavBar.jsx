function NavBar() {
  const links = ["หน้าหลัก", "เมนู", "Meal Plan", "เกี่ยวกับเรา"];
  return (
    <nav className="flex items-center justify-between h-16 px-10 bg-[#F8F6F2] border-b border-[#DDD9D0]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span>Juicy Healthy</span>
      </div>

      {/* Links */}
      <div className="flex gap-8">
        {links.map((link) => {
          const isActive = link === "หน้าหลัก";
          return (
            <a
              href="#"
              className={`text-sm pb-1 no-underline border-b-2 ${isActive ? "font-semibold text-[#5B8C5A] border-[#5B8C5A]" : "font-normal text-[#1C1C1A] border-transparent hover:text-[#5B8C5A]"}`}
            >
              {link}
            </a>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div
          div
          className="flex items-center gap-2 bg-[#EDEAE3] rounded-full px-4 py-2"
        >
          <span>🔍</span>
          <input
            placeholder="ค้นหาเมนู..."
            className="bg-transparent border-none outline-none text-sm text-[#8A8780] w-36"
          />
        </div>

        <div className="relative flex ">
          <span className="text-xl">🛒</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D95B5B]" />

          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
