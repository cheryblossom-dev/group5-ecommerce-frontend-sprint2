import { Outlet } from 'react-router-dom'

import DTopNav from './components/screens/desktop/DTopNav'

function App() {
    return (
        <div className="app-container">
            {/* Header จะคงที่อยู่ในทุกหน้า */}
            <DTopNav />

            {/* Outlet จะเปลี่ยนไปตาม Path ที่เราเลือกใน main.jsx */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
