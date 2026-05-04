import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'

import DTopNav from './components/screens/desktop/DTopNav'
import DFooter from './components/screens/desktop/DFooter'

function App() {
    return (
        <Fragment className="min-h-screen font-sans bg-[#f8f6f1] text-[#2d2a26]">
            <div className="mx-auto flex max-w-281.5 items-center justify-between px-8 py-3">
                <div>
                    {/* Header จะคงที่อยู่ในทุกหน้า */}
                    <DTopNav />

                    {/* Outlet จะเปลี่ยนไปตาม Path ที่เราเลือกใน main.jsx */}
                    <main className="max-w-360 mx-auto">
                        <Outlet />
                    </main>

                    <DFooter />
                </div>
            </div>
        </Fragment>
    )
}

export default App
