import { useState, useEffect } from "react";

function uselinkParser(link) {
  const [service, setService] = useState("");
  const [playListID, setPlaylistID] = useState("");

  useEffect(() => {
    (() => {
      if (link !== "") {
        if (link.includes("youtube")) {
          setPlaylistID(link.split("list=")[1]);
          setService("youtube");
        } else if (link.includes("spotify")) {
          setPlaylistID(link.split("playlist/")[1]);
          setService("spotify");
        } else {
          setPlaylistID(false);
        }
      } else {
        setPlaylistID("");
        setService("");
      }
    })();
  }, [link]);

  return [service, playListID];
}

export { uselinkParser };
