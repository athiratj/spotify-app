import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponse } from "./spotify";

function App() {
  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    console.log(hash);
  }, []);

  return (
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
