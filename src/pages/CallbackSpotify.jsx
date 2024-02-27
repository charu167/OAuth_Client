import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackSpotify() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const access_token = await window.location.hash.split("=")[1];
      sessionStorage.setItem("spotify_access_token", access_token);

      await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((res) => {
          sessionStorage.setItem("spotifyID", res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });

      navigate("/dashboard");
    })();
  }, []);

  return <div>CallbackSpotify</div>;
}
