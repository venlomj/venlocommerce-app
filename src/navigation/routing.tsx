import Order from "@/pages/orders/order"
import { FunctionComponent } from "react"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "@/pages/auth/register/page"
import LoginPage from "@/pages/auth/login/page"
import ProtectedRoute from "@/routes/protectedRoute"
import { ProductPage } from "@/pages/home/product-page"

export const Routing: FunctionComponent = () => {
    return (
      <Routes>
        <Route path={'/products'} element={<ProductPage />} />
        {/* <Route path={'/orders'} element={<Order />} /> */}
        <Route path={'/register'} element={<RegisterPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/'} element={<ProductPage />} />
        <Route path="/orders" element={<ProtectedRoute />}>
        <Route index element={<Order />} />
        </Route>

      </Routes>
    )
  }