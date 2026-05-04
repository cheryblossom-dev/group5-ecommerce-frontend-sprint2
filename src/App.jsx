
import { Outlet } from 'react-router-dom'

import DTopNav from './components/screens/desktop/DTopNav'

function App() {
    return (
        <div className="min-h-screen bg-[#fcfcf9]">
            {/* Header จะคงที่อยู่ในทุกหน้า */}
            <DTopNav />

            {/* Outlet จะเปลี่ยนไปตาม Path ที่เราเลือกใน main.jsx */}
            <main className="max-w-360 mx-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default App
