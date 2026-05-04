import { Button } from "@/components/ui/button";
import DHomeScreen from "./components/screens/desktop/DHomeScreen";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <DHomeScreen />
      <Button>Button</Button>
    </>
  );
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
