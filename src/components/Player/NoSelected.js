import React from "react";
import "./Player.css";
import Alert from "@material-ui/core/Alert";

export default function NoSelected() {
    return (
        <Alert variant="filled" severity="info">
            You have not select any video to play
        </Alert>
    );
}
