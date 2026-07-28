import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import auth from "../lib/auth-helper.js";
import { remove } from "./api-user.js";
import { Navigate } from "react-router-dom";
// DeleteUser.jsx is a delete icon button + confirmation dialog, shown on a
// user's own Profile page. Deleting clears the local session and signs out
// on the server before redirecting home.
export default function DeleteUser({ userId }) {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const jwt = auth.isAuthenticated();
    // Opens the "are you sure?" confirmation dialog.
    const clickButton = () => {
        setOpen(true);
    };

    // Calls the delete API, clears the session, then redirects to "/".
    const deleteAccount = () => {
        remove({ userId }, { t: jwt.token }).then((data) => {
            if (data?.error) {
                console.error(data.error);
            } else {
                auth.clearJWT(() => console.log("deleted"));
                setRedirect(true);
            }
        });
    };
    const handleRequestClose = () => {
        setOpen(false);
    };
    if (redirect) {
        return <Navigate to="/" />;
    }
    return (
        <>

            <IconButton
                aria-label="Delete account"
                onClick={clickButton}
                color="error"
            >
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action is
                        irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteAccount}
                        color="error"

                        variant="contained"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired,
};

