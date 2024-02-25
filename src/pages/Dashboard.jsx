import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Youtube, Music } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    // if (!sessionStorage.getItem("google_access_token")) {
    //   navigate("/auth/google");
    // } else if (!sessionStorage.getItem("spotify_access_token")) {
    //   navigate("/auth/spotify");
    // }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 ">
      <input
        type="text"
        placeholder="Paste Playlist Link Here"
        className="p-2 rounded-full w-full text-center"
      />

      <button className="flex justify-between gap-4">
        <Youtube />
        <ArrowRight />
        <Music />
      </button>
    </div>
  );
}
