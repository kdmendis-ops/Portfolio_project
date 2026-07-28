import React, { useState, useEffect } from "react";
import { Paper, TextField, MenuItem, Button, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { list, listCategories } from "./api-product.js";
import Products from "./Products.jsx";

export default function Search() {
    const [values, setValues] = useState({
        search: "",
        category: "All",
        categories: ["All"],
        results: [],
        searched: false,
    });

    useEffect(() => {
        const abortController = new AbortController();
        listCategories(abortController.signal).then((data) => {
            if (data && !data.error) {
                setValues((prev) => ({ ...prev, categories: ["All", ...data] }));
            }
        });
        return () => abortController.abort();
    }, []);

    const search = () => {
        const abortController = new AbortController();
        list(
            {
                search: values.search,
                category: values.category === "All" ? "" : values.category,
            },
            abortController.signal
        ).then((data) => {
            if (data && !data.error) {
                setValues((prev) => ({ ...prev, results: data, searched: true }));
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <Paper sx={{ maxWidth: 800, margin: "auto", mt: 5, p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Find Products
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                <TextField
                    label="Search by name"
                    value={values.search}
                    onChange={handleChange("search")}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") search();
                    }}
                    sx={{ minWidth: 220 }}
                />
                <TextField
                    select
                    label="Category"
                    value={values.category}
                    onChange={handleChange("category")}
                    sx={{ minWidth: 160 }}
                >
                    {values.categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={search}
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Products products={values.results} searched={values.searched} />
            </Box>
        </Paper>
    );
}
