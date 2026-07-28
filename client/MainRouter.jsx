// MainRouter.jsx declares the client-side URL routes and maps each one to
// the page component that should render. It's rendered once, inside App.jsx,
// underneath the shared Menu nav bar.
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Users from './user/Users'
import Signin from './user/Signin'
import Profile from './user/Profile'

import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'

import Shops from './shop/Shops.jsx'
import ShopProduct from './shop/ShopProduct.jsx'
import MyShops from './shop/MyShops.jsx'
import NewShop from './shop/NewShop.jsx'
import EditShop from './shop/EditShop.jsx'

import NewProduct from './product/NewProduct.jsx'
import EditProduct from './product/EditProduct.jsx'
import Product from './product/Product.jsx'
import Search from './product/Search.jsx'

import CartItems from './cart/CartItems.jsx'
import Checkout from './cart/Checkout.jsx'

import Menu from './core/Menu'
function MainRouter() {
    return (
        <div>
            {/* Nav bar shown on every page */}
            <Menu />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/shops/all" element={<Shops />} />
                <Route path="/shops/:shopId" element={<ShopProduct />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cartItems" element={<CartItems />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                {/* PrivateRoute redirects to /signin if the user isn't authenticated */}
                <Route
                    path="/user/edit/:userId"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route path="/user/:userId" element={<Profile />} />
                <Route
                    path="/seller/shops"
                    element={
                        <PrivateRoute>
                            <MyShops />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/seller/shop/new"
                    element={
                        <PrivateRoute>
                            <NewShop />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/seller/shop/edit/:shopId"
                    element={
                        <PrivateRoute>
                            <EditShop />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/seller/:shopId/products/new"
                    element={
                        <PrivateRoute>
                            <NewProduct />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/seller/:shopId/:productId/edit"
                    element={
                        <PrivateRoute>
                            <EditProduct />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}
export default MainRouter;
