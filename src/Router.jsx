import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Form,
  Pie,
  LoginPage
} from "./scenes";

const router = createBrowserRouter([
  {
    path: "/app/:id",
    element: <App />, 
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "team", element: <Team /> },
      { path: "invoices", element: <Invoices /> },
      { path: "form", element: <Form /> },
      { path: "pie", element: <Pie /> },
    ],
  },
  { 
    path: "/login",
    element: <LoginPage/>
  },
  { 
    path: "/", 
    element: <Navigate to="/login" replace/>
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
