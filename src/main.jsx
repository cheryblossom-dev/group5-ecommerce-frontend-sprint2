import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import DHomeScreen from './components/screens/desktop/DHomeScreen'
import DCatalogScreen from './components/screens/desktop/DCatalogScreen'
import DProductDetailScreen from './components/screens/desktop/DProductDetailScreen'

const router = createBrowserRouter([
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
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
