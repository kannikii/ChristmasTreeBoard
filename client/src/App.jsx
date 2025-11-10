import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import pixelBg from "./assets/pixel-bg.jpg";
import "./App.css";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyTreesPage from "./pages/MyTreesPage"; // ✅ 수정됨
import TreePage from "./pages/TreePage";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    alert("로그아웃 되었습니다.");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pixelBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Snowfall color="#fff" snowflakeCount={60} style={{ imageRendering: "pixelated" }} />
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mytrees" element={<MyTreesPage user={user} />} />
        <Route path="/tree/:id" element={<TreePage user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
