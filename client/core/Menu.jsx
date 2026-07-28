// Menu.jsx is the top navigation bar, shown on every page (rendered from
// MainRouter.jsx). It swaps between "Sign up / Sign in" and the
// authenticated links (My Shops for sellers/admins, My Profile, Sign out)
// depending on whether the user is authenticated.
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import CartIcon from "@mui/icons-material/ShoppingCart";
import auth from "../lib/auth-helper.js";
import cart from "../cart/cart-helper.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Highlights the nav link matching the current URL, otherwise white.
const isActive = (location, path) =>
    location.pathname === path ? "#ff4081" : "#ffffff";
// Like isActive, but matches any URL under `path` (e.g. nested seller pages).
const isPartActive = (location, path) =>
    location.pathname.includes(path) ? { color: "#bef67a" } : { color: "#ffffff" };
export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const jwt = auth.isAuthenticated();
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    MERN Skeleton
                </Typography>

                <Link to="/">
                    <IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to="/shops/all" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: isActive(location, "/shops/all") }}>
                        All Shops
                    </Button>
                </Link>
                <Link to="/search" style={{ textDecoration: "none" }}>
                    <Button
                        sx={{ color: isActive(location, "/search") }}
                        startIcon={<SearchIcon />}
                    >
                        Search
                    </Button>
                </Link>
                <Link to="/users">
                    <Button sx={{ color: isActive(location, "/users") }}>Users</Button>
                </Link>
                <Link to="/cartItems" style={{ textDecoration: "none" }}>
                    <Button
                        sx={{ color: isActive(location, "/cartItems") }}
                        startIcon={
                            <Badge
                                color="secondary"
                                badgeContent={cart.itemTotal()}
                                invisible={cart.itemTotal() === 0}
                            >
                                <CartIcon />
                            </Badge>
                        }
                    >
                        Cart
                    </Button>
                </Link>
                {!jwt && (
                    <>
                        <Link to="/signup">
                            <Button sx={{ color: isActive(location, "/signup") }}>
                                Sign up
                            </Button>
                        </Link>
                        <Link to="/signin">
                            <Button sx={{ color: isActive(location, "/signin") }}>
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}
                {jwt && (
                    <>
                        {(jwt.user?.seller || jwt.user?.role === "Admin") && (
                            <Link to="/seller/shops">
                                <Button style={isPartActive(location, "/seller/")}>
                                    My Shops
                                </Button>
                            </Link>
                        )}
                        <Link to={`/user/${jwt.user._id}`}>
                            <Button
                                sx={{ color: isActive(location, `/user/${jwt.user._id}`) }}
                            >
                                My Profile
                            </Button>
                        </Link>
                        <Button
                            sx={{ color: "#ffffff" }}
                            onClick={() => {
                                auth.clearJWT(() => navigate("/"));
                            }}
                        >
                            Sign out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
