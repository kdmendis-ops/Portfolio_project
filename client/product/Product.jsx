import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardMedia, Typography, Grid, Box } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../cart/AddToCart.jsx";
import { read } from "./api-product.js";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState({ shop: {} });
    const [error, setError] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read({ productId }, signal).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
        return () => abortController.abort();
    }, [productId]);

    const imageUrl = product._id
        ? `/api/product/image/${product._id}?${new Date().getTime()}`
        : "/api/product/defaultphoto";

    return (
        <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <Card sx={{ p: 3 }}>
                        <CardHeader
                            title={product.name}
                            subheader={product.quantity > 0 ? "In Stock" : "Out of Stock"}
                            action={
                                <Box sx={{ display: "inline-block", m: 1 }}>
                                    <AddToCart
                                        item={product}
                                        cartStyle={{
                                            width: "35px",
                                            height: "35px",
                                            padding: "10px 12px",
                                            borderRadius: "0.25em",
                                            backgroundColor: "#5f7c8b",
                                        }}
                                    />
                                </Box>
                            }
                        />
                        <Box sx={{ display: "flex" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: "50%", height: 200, ml: 3 }}
                                image={imageUrl}
                                title={product.name}
                            />
                            <Box sx={{ p: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 2, color: "text.primary" }}>
                                    {product.description}
                                </Typography>
                                <Box
                                    sx={{
                                        backgroundColor: "#93c5ae3d",
                                        color: "#375a53",
                                        fontSize: "1.3em",
                                        p: 2,
                                        mb: 2,
                                        display: "inline-block",
                                    }}
                                >
                                    $ {product.price}
                                </Box>
                                {product.shop?._id && (
                                    <Box>
                                        <Link
                                            to={`/shops/${product.shop._id}`}
                                            style={{
                                                color: "#3e4c54b3",
                                                fontSize: "0.9em",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <ShoppingBasketIcon
                                                sx={{ verticalAlign: "sub", fontSize: "1rem", mr: 0.5 }}
                                            />
                                            {product.shop.name}
                                        </Link>
                                    </Box>
                                )}
                                {error && (
                                    <Typography color="error" sx={{ mt: 1 }}>
                                        {error}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
