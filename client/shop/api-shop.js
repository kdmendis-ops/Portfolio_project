// api-shop.js wraps the /api/shop(s) endpoints with fetch. Create/update send
// FormData (shop name/description/logo image) instead of JSON, so no
// Content-Type header is set - the browser fills in the multipart boundary.
const create = async (params, credentials, shop) => {
    try {
        const response = await fetch("/api/shops/by/" + params.userId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
            body: shop,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const list = async (signal) => {
    try {
        const response = await fetch("/api/shops", {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const listByOwner = async (params, credentials, signal) => {
    try {
        const response = await fetch("/api/shops/by/" + params.userId, {
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const read = async (params, signal) => {
    try {
        const response = await fetch("/api/shop/" + params.shopId, {
            method: "GET",
            signal,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const update = async (params, credentials, shop) => {
    try {
        const response = await fetch("/api/shops/" + params.shopId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
            body: shop,
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
const remove = async (params, credentials) => {
    try {
        const response = await fetch("/api/shops/" + params.shopId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
        });
        return await response.json();
    } catch (err) {
        console.error("API call failed:", err);
        throw err;
    }
};
export { create, list, listByOwner, read, update, remove };
