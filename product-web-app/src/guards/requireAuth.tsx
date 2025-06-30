import { Navigate } from "react-router-dom";
import { store } from "../redux/store";
import type { JSX } from "react";

export function requireAuth(element: JSX.Element): JSX.Element {
    const isAuthenticated = store.getState().auth.isAuthenticated;

    console.log(isAuthenticated)
    
    return isAuthenticated ? element : <Navigate to="/login" replace />;
}