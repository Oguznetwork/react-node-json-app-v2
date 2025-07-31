import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Fetch hatası:", err));
  }, []);

  return (
    <div>
      <h1>Client - React</h1>
      <p>Sunucudan gelen mesaj: {message}</p>
    </div>
  );
}

export default App;
