import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { GuestRoute, PrivateRoute, AdminRoute } from "./routes/ProtectedRoutes";

import AdminLayout from "./components/screens/desktop/admin/AdminLayout";
import AdminDashboard from "./components/screens/desktop/admin/AdminDashboard";
import AdminProducts from "./components/screens/desktop/admin/AdminProducts";
import AdminOrders from "./components/screens/desktop/admin/AdminOrders";
import AdminCustomers from "./components/screens/desktop/admin/AdminCustomers";

import DHomeScreen from "./components/screens/desktop/DHomeScreen";
import DCatalogScreen from "./components/screens/desktop/DCatalogScreen";
import DProductDetailScreen from "./components/screens/desktop/DProductDetailScreen";
import DTrackingScreen from "./components/screens/desktop/DTrackingScreen";
import DPaymentSuccessScreen from "./components/screens/desktop/DPaymentSuccessScreen";
import DEtc1Screen from "./components/screens/desktop/DEtc1Screen";
import DEtc2Screen from "./components/screens/desktop/DEtc2Screen";
import DEtc3Screen from "./components/screens/desktop/DEtc3Screen";
import DEtc4Screen from "./components/screens/desktop/DEtc4Screen";
import DLoginScreen from "./components/screens/desktop/DLoginScreen";
import DRegisterScreen from "./components/screens/desktop/DRegisterScreen";
import DCartCheckoutScreen from "./components/screens/desktop/DCartCheckoutScreen";
import DPaymentScreen from "./components/screens/desktop/DPaymentScreen";
import DBmiScreen from "./components/screens/desktop/DBmiScreen";
import DProfileScreen from "./components/screens/desktop/DProfileScreen";

const router = createBrowserRouter([
  // admin
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <AdminProducts /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "customers", element: <AdminCustomers /> },
        ],
      },
    ],
  },

  // user
  {
    path: "/",
    element: <App />,
    children: [
      // 🟢 public (all user)
      { path: "/", element: <DHomeScreen /> },
      { path: "/catalog", element: <DCatalogScreen /> },
      { path: "/bmi", element: <DBmiScreen /> },
      { path: "/product/:id", element: <DProductDetailScreen /> },
      { path: "/etc1", element: <DEtc1Screen /> },
      { path: "/etc2", element: <DEtc2Screen /> },
      { path: "/etc3", element: <DEtc3Screen /> },
      { path: "/etc4", element: <DEtc4Screen /> },

      // 🟡 guest (not yet login user)
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <DLoginScreen /> },
          { path: "/register", element: <DRegisterScreen /> },
        ],
      },

      // 🔴 private (login user)
      {
        element: <PrivateRoute />,
        children: [
          { path: "/cart", element: <DCartCheckoutScreen /> },
          { path: "/payment", element: <DPaymentScreen /> },
          { path: "/payment-success", element: <DPaymentSuccessScreen /> },
          { path: "/tracking", element: <DTrackingScreen /> },
          { path: "/profile", element: <DProfileScreen /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
