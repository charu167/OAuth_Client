import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

//Importing Custom Hooks
import { useLogin } from "../hooks/useLogin";
import { uselinkParser } from "../hooks/useLinkParser";

export default function Dashboard() {
  // Login Check
  useLogin();

  const [link, setLink] = useState("");
  const [service, playListID] = uselinkParser(link);

  return (
    <div className="w-full flex flex-col gap-4 ">
      <input
        type="text"
        placeholder="Paste Playlist Link Here"
        className="p-2 rounded-full w-full text-center"
        onChange={(e) => {
          setLink(e.target.value);
        }}
        value={link}
      />

      <button className="flex justify-between gap-4">
        <ArrowRight />
      </button>

      <h4>{service}</h4>
      <h4> {playListID} </h4>
    </div>
  );
}
