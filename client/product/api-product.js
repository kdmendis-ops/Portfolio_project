// api-product.js wraps the /api/product(s) endpoints with fetch. Create/update
// send FormData (name/description/category/quantity/price/image) instead of
// JSON, so no Content-Type header is set - the browser fills in the boundary.
const create = async (params, credentials, product) => {
    try {
        const response = await fetch("/api/products/by/" + params.shopId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
            body: product,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const read = async (params, signal) => {
    try {
        const response = await fetch("/api/products/" + params.productId, {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const update = async (params, credentials, product) => {
    try {
        const response = await fetch(
            "/api/product/" + params.shopId + "/" + params.productId,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${credentials.t}`,
                },
                body: product,
            }
        );
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const remove = async (params, credentials) => {
    try {
        const response = await fetch(
            "/api/product/" + params.shopId + "/" + params.productId,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${credentials.t}`,
                },
            }
        );
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const listByShop = async (params, signal) => {
    try {
        const response = await fetch("/api/products/by/" + params.shopId, {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
// Searches products by name and/or category, e.g. list({ search: "bike", category: "Outdoor" }, signal).
const list = async (params, signal) => {
    try {
        const query = new URLSearchParams();
        if (params.search) query.append("search", params.search);
        if (params.category) query.append("category", params.category);
        const response = await fetch("/api/products?" + query.toString(), {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const listCategories = async (signal) => {
    try {
        const response = await fetch("/api/products/categories", {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
export { create, read, update, remove, listByShop, list, listCategories };
