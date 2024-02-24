import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import CallbackGoogle from "./pages/CallbackGoogle";
import CallbackSpotify from "./pages/CallbackSpotify";

import GoogleAuth from "./pages/GoogleAuth";
import SpotifyAuth from "./pages/SpotifyAuth";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path="/auth/google" element={<GoogleAuth />} />
        <Route path="/callback/google" element={<CallbackGoogle />} />

        <Route path="/auth/spotify" element={<SpotifyAuth />} />
        <Route path="/callback/spotify" element={<CallbackSpotify />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
