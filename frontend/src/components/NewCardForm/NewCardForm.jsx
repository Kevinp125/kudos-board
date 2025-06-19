import React from "react";
import { useState } from "react";
import "./newcardform.css";

export default function NewCardForm({
  setNewCardFormOpened,
  handleNewCardSubmission,
  boardId,
}) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [cardAuthor, setCardAuthor] = useState("");
  const [gifQuery, setGifQuery] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState("");

  function handleClose() {
    setNewCardFormOpened(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //here construct object from stuff user typed and then send it up to parent
    const newCard = {
      title: cardTitle,
      message: cardMessage,
      author: cardAuthor ? cardAuthor : "Anonymous",
      boardId: boardId,
      upvotes: 0,
      gif: selectedGifUrl,
    };
    handleNewCardSubmission(newCard);
  };

  const handleGifSearch = async () => {
    if (!gifQuery) return; //if there is no query return cause we cant search
    const apiKey = import.meta.env.VITE_GIF_KEY;
    const gifLimit = 6;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
      gifQuery
    )}&limit=${gifLimit}`; //encodeURI fromates query to be accepted as a url even if it includes spaces and weird special characters

    try {
      const res = await fetch(url); //fetch the gifs

      if (!res.ok) {
        throw new Error("error fetching the gifs for that search");
      }

      const gifList = await res.json();
      setGifResults(gifList.data);
    } catch (err) {
      console.error("GIF search failed:", err);
    }
  };

  function handleGifSelection(selectedGif) {
    setSelectedGifUrl(selectedGif.images.fixed_height.url);
  }

  const handleCardTitleChange = (event) => {
    setCardTitle(event.target.value);
  };

  const handleCardMessageChange = (event) => {
    setCardMessage(event.target.value);
  };

  const handleCardAuthorChange = (event) => {
    setCardAuthor(event.target.value);
  };

  return (
    <div className="form-overlay">
      <form onSubmit={handleSubmit} id="form-container">
        <div>
          <span onClick={handleClose} className="close">
            &times;
          </span>
        </div>

        <h2>Add New Card</h2>

        <div className="form-group">
          <label for="cardTitle">Card Title</label>
          <input
            onChange={handleCardTitleChange}
            value={cardTitle}
            type="text"
            id="cardTitle"
            name="cardTitle"
            required
          />
        </div>

        <div className="form-group">
          <label for="messaage">Card Message</label>
          <input
            onChange={handleCardMessageChange}
            value={cardMessage}
            type="text"
            id="message"
            name="message"
            required
          />
        </div>

        <div className="form-group">
          <label for="Author">Author</label>
          <input
            onChange={handleCardAuthorChange}
            value={cardAuthor}
            type="text"
            id="Author"
            name="Author"
            placeholder="Optional"
          />
        </div>

        <div className="form-group">
          <label for="gifSearch">GIF</label>
          <input
            type="text"
            placeholder="Search for a GIF"
            value={gifQuery}
            onChange={(e) => setGifQuery(e.target.value)}
          />
          <button className="gif-btn" type="button" onClick={handleGifSearch}>
            Search GIFs
          </button>

          {/*After above handleGifSearch is processed fetch request was made and results are stored in gifResults array below I will map through it and show each gif result in grid for user to pick from */}
          {/*Every time a gif is selected we set selectedGifUrl state which triggers re-render. Then in img tag we have trick so if teh selectedUrl matches url of gif we are on give it the selected css property so user can see it as selected */}
          <div className="gif-results-container">
            {gifResults.map((gif) => (
              <img
                className={`gif-img ${
                  selectedGifUrl === gif.images.fixed_height.url
                    ? "gif-selected"
                    : ""
                }`}
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => handleGifSelection(gif)}
              />
            ))}
          </div>
        </div>

        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
