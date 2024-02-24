import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackGoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const access_token = await window.location.hash.split("=")[1];
      sessionStorage.setItem("google_access_token", access_token);
      navigate("/dashboard");
    })();
  }, []);
  return <div>Callback</div>;
}
