import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import AdminLayout from './components/screens/desktop/admin/AdminLayout'
import AdminDashboard from './components/screens/desktop/admin/AdminDashboard'
import AdminProducts from './components/screens/desktop/admin/AdminProducts'
import AdminOrders from './components/screens/desktop/admin/AdminOrders'

import DHomeScreen from './components/screens/desktop/DHomeScreen'
import DCatalogScreen from './components/screens/desktop/DCatalogScreen'
import DProductDetailScreen from './components/screens/desktop/DProductDetailScreen'
import DTrackingScreen from './components/screens/desktop/DTrackingScreen'
import DEtc1Screen from './components/screens/desktop/DEtc1Screen'
import DEtc2Screen from './components/screens/desktop/DEtc2Screen'
import DEtc3Screen from './components/screens/desktop/DEtc3Screen'
import DEtc4Screen from './components/screens/desktop/DEtc4Screen'

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true,          element: <AdminDashboard /> },
            { path: 'products',     element: <AdminProducts /> },
            { path: 'orders',       element: <AdminOrders /> },
        ],
    },
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <DHomeScreen />,
            },
            {
                path: '/catalog',
                element: <DCatalogScreen />,
            },
            {
                path: '/product/:id',
                element: <DProductDetailScreen />,
            },
            {
                path: '/tracking',
                element: <DTrackingScreen />,
            },
            {
                path: '/etc1',
                element: <DEtc1Screen />,
            },
            {
                path: '/etc2',
                element: <DEtc2Screen />,
            },
            {
                path: '/etc3',
                element: <DEtc3Screen />,
            },
            {
                path: '/etc4',
                element: <DEtc4Screen />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
