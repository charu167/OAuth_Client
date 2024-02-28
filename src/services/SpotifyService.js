import axios from "axios";

const spotifyAccessToken = sessionStorage.getItem("spotify_access_token");

//Get spotify IDs for YT songs
export async function getSpotifyIDs(playListItems) {
  const requests = playListItems.map((item) => {
    return axios
      .get("https://api.spotify.com/v1/search", {
        params: {
          q: item, // Assuming you meant to search for the item here
          type: "track",
          limit: 1,
        },
        headers: {
          Authorization:
            "Bearer " + sessionStorage.getItem("spotify_access_token"),
        },
      })
      .then((res) => {
        return res.data.tracks.items.length > 0
          ? res.data.tracks.items[0].id
          : null;
      })
      .catch((err) => {
        console.error("Error fetching Spotify ID for item:", item, err);
        return null; // Return null or some indication of failure
      });
  });

  const trackIds = await Promise.all(requests);
  return trackIds.filter((id) => id !== null); // Filter out nulls if any request failed
}

//Create Spotify Playlist
export async function createSpotifyPlaylist() {
  const response = await axios.post(
    `https://api.spotify.com/v1/users/${sessionStorage.getItem(
      "spotifyID"
    )}/playlists`,
    {
      name: "SyncWave Playlist",
    },
    {
      headers: {
        Authorization:
          "Bearer " + sessionStorage.getItem("spotify_access_token"),
        "Content-Type": "application/json",
      },
    }
  );
  const playlistId = response.data.id; // Assuming the response includes the playlist ID
  // console.log("Created Spotify playlist ID:", playlistId);
  return playlistId;
}

//Add songs to newly created spotify playlist
export async function addToSpotifyPlaylist(playlistId, trackIds) {
  const uris = trackIds.map((id) => `spotify:track:${id}`);
  await axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: uris,
        position: 0,
      },
      {
        headers: {
          Authorization:
            "Bearer " + sessionStorage.getItem("spotify_access_token"),
          "Content-Type": "application/json",
        },
      }
    )
    .then()
    .catch((err) => {
      console.log(err);
    });
  // console.log(`Added tracks to Spotify playlist ${playlistId}`);
}
