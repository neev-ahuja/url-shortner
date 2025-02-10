import { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.startsWith("http")) {
      alert("Please enter a valid URL starting with http or https");
      return;
    }

    (async () => {
        try {
            const data = { url: longUrl };
            const response = await fetch('http://localhost:3000/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setShortUrl("http://localhost:3000/" + result.id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    })();
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied to clipboard!");
  };

  return (
    <div className="container">
      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Generate Link</button>
      </form>
      {shortUrl && (
        <div className="result">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
