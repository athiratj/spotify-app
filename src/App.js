import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./components/Datalayer";

const s = new SpotifyWebApi();
function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getPlaylist("17I8Yohdh2wEDRaeBg7N6V").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">{token ? <Player spotify={s} /> : <Login />}</div>
  );
}

export default App;
