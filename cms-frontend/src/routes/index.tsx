import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import AuthLayout from "components/layouts/AuthLayout";

// Pages
import LandingPage from "pages/LandingPage";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

export default function MainRoutes() {
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
