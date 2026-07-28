// api-auth.js wraps the two auth API calls (sign in / sign out) with fetch.
// These are thin HTTP helpers - session state itself lives in auth-helper.js.

// POST /auth/signin with the user's credentials; the server sets an auth
// cookie and returns a JWT + basic profile info in the response body.
const signin = async (user) => {
    try {
        let response = await fetch("/auth/signin/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            // Include cookies so the server's response cookie is stored.
            credentials: "include",
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
// GET /auth/signout to clear the server-side auth cookie.
const signout = async () => {
    try {
        let response = await fetch("/auth/signout/", { method: "GET" });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
export { signin, signout };
