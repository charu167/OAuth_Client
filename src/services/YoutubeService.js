import axios from "axios";

//Fetch YT PLaylist Items
export async function fetchYTPLaylist(
  pageToken = "",
  playListItemsAcc = [],
  playListID
) {
  return axios
    .get("https://www.googleapis.com/youtube/v3/playlistItems", {
      params: {
        part: "snippet",
        playlistId: playListID,
        key: "AIzaSyBDAZp4acUkJAF_jVOjSnaplaVVglYjEuQ",
        pageToken,
      },
    })
    .then((res) => {
      const newItems = res.data.items.map((e) => e.snippet.title);
      const allItems = [...playListItemsAcc, ...newItems];
      if (res.data.nextPageToken) {
        return fetchYTPLaylist(res.data.nextPageToken, allItems, playListID);
      } else {
        return allItems; // Resolve with all fetched items
      }
    });
}

//Get YT IDs for spotify songs
export async function getYoutubeIDs(tracks) {
  const apiKey = "AIzaSyBDAZp4acUkJAF_jVOjSnaplaVVglYjEuQ"; // Ensure this is securely stored and accessed
  const videos = await Promise.all(
    tracks.map(async (track) => {
      const query = `${track.name} ${track.artist}`;
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            key: apiKey,
            maxResults: 1,
            type: "video",
          },
        }
      );
      if (response.data.items.length > 0) {
        return response.data.items[0].id.videoId;
      } else {
        return null; // Handle case where no video is found
      }
    })
  );
  return videos.filter((videoId) => videoId !== null);
}

//Creating Youtube Playlist
export async function createYouTubePlaylist(title) {
  const createPlaylistResponse = await axios.post(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet,status",
    {
      snippet: {
        title: title,
      },
      status: {
        privacyStatus: "public", // or 'public' or 'unlisted' depending on your needs
      },
    },
    {
      headers: {
        Authorization:
          "Bearer " + sessionStorage.getItem("google_access_token"),
        "Content-Type": "application/json",
      },
      // params: {
      //   part: "snippet,status",
      // },
    }
  );

  return createPlaylistResponse.data.id; // Return the new playlist ID
}

//Add songs to newly created youtube playlist
export async function addVideosToYouTubePlaylist(playlistId, videoIds) {
  for (const videoId of videoIds) {
    await axios.post(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet",
      {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId: videoId,
          },
        },
      },
      {
        headers: {
          Authorization:
            "Bearer " + sessionStorage.getItem("google_access_token"),
          "Content-Type": "application/json",
        },
      }
    );
  }
}
