import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import { supabase } from "./lib/client";
import { StudentInfoContextProvider } from "./context/StudentInfoContext";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, sesion) => {
      if (sesion) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <>
      <StudentInfoContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StudentInfoContextProvider>
    </>
  );
}

export default App;
