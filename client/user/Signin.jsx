import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import auth from "../lib/auth-helper.js";
import { Navigate, useLocation } from "react-router-dom";
import { signin } from "../lib/api-auth.js";
// Signin.jsx renders the login form. On success it stores the JWT via
// auth-helper and redirects back to whatever page the user came from
// (the "from" location PrivateRoute stashed before redirecting here).
export default function Signin() {
    const location = useLocation();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false,
    });

    // Calls the signin API; on success, stores the JWT and flags a redirect.
    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        };
        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: "", redirectToReferrer: true });
                });
            }
        });
    };
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    // Falls back to "/" if the user navigated here directly (not via a redirect).
    const { from } = location.state || {
        from: { pathname: "/" },
    };

    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }
    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "auto",
                textAlign: "center",
                mt: 5,
                pb: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
                    Sign In
                </Typography>
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    sx={{ mx: 1, width: 300 }}

                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                />
                <br />
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    sx={{ mx: 1, width: 300 }}
                    value={values.password}
                    onChange={handleChange("password")}
                    margin="normal"
                />
                <br />
                {values.error && (
                    <Typography component="p" color="error" sx={{ mt: 1 }}>
                        <Icon color="error" sx={{ verticalAlign: "middle", mr: 0.5 }}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>
                )}

            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={clickSubmit}
                    sx={{ margin: "auto", mb: 2 }}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}

