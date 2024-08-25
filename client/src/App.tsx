import React, { useEffect } from "react"
import Home from './pages/Home'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import AdminProductDetails from "./features/admin/AdminProductDetail";
import UserOrders from "./features/user/components/UserOrders";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import ProductFormPage from "./pages/ProductFormPage";
import UserProfilePage from "./pages/UserProfilePage";
//json-server --watch dummy.json --port 8080   

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome/></ProtectedAdmin> ,
  },
  {
    path: "/singup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/productdetails/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "admin/productdetails/:id",
    element: <ProtectedAdmin><AdminProductDetails/></ProtectedAdmin>,
  },
  {
    path: "admin/productform",
    element: <ProtectedAdmin><ProductFormPage/></ProtectedAdmin>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage/> ,
  },
  {
    path: "/order",
    element: <UserOrders></UserOrders> ,
  },
]);
function App() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch,user])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
