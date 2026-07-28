import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Paper,
    Divider,
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
} from "@mui/material";
import cart from "./cart-helper.js";

export default function Checkout() {
    // Lazy initializers read localStorage once on mount, no effect needed.
    const [checkoutDetails] = useState(() => {
        const cartItems = cart.getCart();
        const totalAmount = cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
        return { products: cartItems, total: totalAmount };
    });

    const [shipping, setShipping] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
    const [billingOverride, setBillingOverride] = useState({ ...shipping });
    // While synced, billing mirrors shipping directly instead of copying it
    // into state via an effect.
    const billing = billingSameAsShipping ? shipping : billingOverride;

    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const handleCouponApply = () => {
        setDiscount(couponCode.trim().toLowerCase() === "save10" ? 10 : 0);
    };

    const finalTotal = Math.max(0, checkoutDetails.total - discount);

    return (
        <Paper sx={{ padding: 4, maxWidth: 700, margin: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Checkout
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                {checkoutDetails.products.length === 0 ? (
                    <Typography>Your cart is empty.</Typography>
                ) : (
                    checkoutDetails.products.map((product, index) => (
                        <Typography key={index}>
                            {product.product.name} × {product.quantity} — $
                            {product.product.price * product.quantity}
                        </Typography>
                    ))
                )}
                <Divider sx={{ my: 2 }} />
                <Typography>Total: ${checkoutDetails.total.toFixed(2)}</Typography>
                {discount > 0 && (
                    <Typography color="success.main">
                        Discount: -${discount.toFixed(2)}
                    </Typography>
                )}
                <Typography variant="h6">Final Total: ${finalTotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <Button onClick={handleCouponApply} variant="outlined">
                    Apply Coupon
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <Box sx={{ mb: 3 }}>
                {["name", "email", "address", "city", "postalCode", "country"].map((field) => (
                    <TextField
                        key={field}
                        type={field === "email" ? "email" : "text"}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={shipping[field]}
                        onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                ))}
            </Box>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={billingSameAsShipping}
                        onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                    />
                }
                label="Billing address is the same as shipping"
            />
            {!billingSameAsShipping && (
                <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Billing Address
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        {["name", "address", "city", "postalCode", "country"].map((field) => (
                            <TextField
                                key={field}
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={billing[field]}
                                onChange={(e) => setBillingOverride({ ...billing, [field]: e.target.value })}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        ))}
                    </Box>
                </>
            )}

            <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => cart.emptyCart(() => {})}
                >
                    Place Order
                </Button>
            </Link>
        </Paper>
    );
}
