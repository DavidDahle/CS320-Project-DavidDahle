import { useEffect, useState } from 'react';
import { API_URL } from "./config"; // Gets API_URL from config.js

function App() {
  // State to hold the message from the backend
  const [message, setMessage] = useState("");

  // Fetch message from the backend on page load
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/hello/personalized`, {
          method: 'POST', // POST request
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ first: 'Ensign', last: 'Student' }) // JSON body
        });

        const text = await response.text(); // Convert response to text
        setMessage(text); // Update state with backend response
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Failed to load message");
      }
    };

    fetchMessage();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      <h1>Message from the backend:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;