import { Link } from 'react-router-dom'

const DFooter = () => {
    return (
        <footer className="bg-[#fcfbf8] border-t border-[#ddd6c8] pt-12 pb-8 px-6 md:px-12 text-[#2d2a26]">
            <div className="max-w-281.5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Column 1: Brand & Description */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d6d2c7] bg-white shadow-sm">
                            <span className="text-sm">🥗</span>
                        </div>
                        <span className="text-[15px] font-bold tracking-wide text-[#202020]">
                            JuicyHealthy
                        </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#8e8a83] max-w-xs">
                        เราคือจุดเริ่มต้นของคุณภาพชีวิตที่ดี
                        คัดสรรวัตถุดิบออร์แกนิกส่งตรงถึงบ้าน
                        เพื่อสุขภาพที่ยั่งยืนของทุกคน
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-[14px] font-bold mb-5 text-[#202020]">
                        เมนูแนะนำ
                    </h4>
                    <ul className="space-y-3 text-[13px] text-[#8e8a83]">
                        <li>
                            <Link
                                to="/catalog"
                                className="hover:text-[#72a25f] transition"
                            >
                                อกไก่ปั่น
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/catalog"
                                className="hover:text-[#72a25f] transition"
                            >
                                สลัด & Bowl
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/etc2"
                                className="hover:text-[#72a25f] transition"
                            >
                                Meal Plan
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/etc1"
                                className="hover:text-[#72a25f] transition"
                            >
                                เกี่ยวกับเรา
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact & Team */}
                <div>
                    <h4 className="text-[14px] font-bold mb-5 text-[#202020]">
                        ทีมผู้พัฒนา
                    </h4>
                    <ul className="space-y-3 text-[13px] text-[#8e8a83]">
                        <li className="flex items-center gap-2">
                            <span className="font-semibold text-[#72a25f]">
                                Project:
                            </span>{' '}
                            Debug Impact Five
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="font-semibold text-[#72a25f]">
                                Cohort:
                            </span>{' '}
                            JSD12
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className="max-w-281.5 mx-auto border-t border-[#eee7db] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[12px] text-[#aaa295]">
                    © 2026 Juicy Healthy. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#aaa295] font-medium uppercase tracking-widest">
                    <span>Debug Impact Five</span>
                    <span className="text-[#d7d1c5]">|</span>
                    <span>JSD12</span>
                </div>
            </div>
        </footer>
    )
}

export default DFooter
