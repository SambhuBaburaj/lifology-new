import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import LoggedInUser from "./ProtectedRoutes/LoggedInUser";
import LoggedOutUser from "./ProtectedRoutes/LoggedOutUser";

import Register from "./Pages/Register";
import Home from "./Pages/Home";
import OTPconfirm from "./Pages/OTPconfirm";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import NotFoundPage from "./Pages/NotFound";

function App() {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  if (Loading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route element={<LoggedInUser />}>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Register />} path="/register" />
        <Route element={<OTPconfirm />} path="/otp" />
      </Route>
      <Route element={<LoggedOutUser />}>
        <Route element={<Home />} path="/" />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
