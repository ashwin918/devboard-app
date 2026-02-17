import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/announcements";

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(API);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, { title, message });
    setTitle("");
    setMessage("");
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>✨ DevBoard</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="🚀 Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Write something awesome..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Post It 🔥</button>
        </form>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="post-title">{post.title}</div>
          <div className="post-message">{post.message}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
