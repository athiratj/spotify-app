import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponse } from "./spotify";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
    console.log(token);
  }, []);

  return <div className="app">{token ? <h1>Logged</h1> : <Login />}</div>;
}

export default App;
