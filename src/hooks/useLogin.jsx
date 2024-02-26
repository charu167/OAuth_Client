import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function useLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("google_access_token")) {
      navigate("/auth/google");
    } else if (!sessionStorage.getItem("spotify_access_token")) {
      navigate("/auth/spotify");
    }
  }, []);
}
export { useLogin };
