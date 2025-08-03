import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <h2>Hoşgeldin, {user.username}!</h2>
      ) : (
        <>
          <Login onLogin={setUser} />
          <hr />
          <Register />
        </>
      )}
    </div>
  );
}
