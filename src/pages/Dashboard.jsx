import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("google_access_token")) {
      navigate("/auth/google");
    } else if (!sessionStorage.getItem("spotify_access_token")) {
      navigate("/auth/spotify");
    }
  }, []);

  return <div>Dashboard</div>;
}
