import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};


export default RouteGuard;