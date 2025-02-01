import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Form,
  Pie,
} from "./scenes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/pie" element={<Pie />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
