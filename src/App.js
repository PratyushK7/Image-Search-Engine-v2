import react, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo.js";

const clientID = `?key=${process.env.REACT_APP_ACCESS_KEY}`;
const photosPerPage = 12;
const mainURL = `https://pixabay.com/api/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);

    let url;
    const urlPage = `&per_page=${photosPerPage}&page=${page}`;
    const urlQuery = `&q=${query}&image_type=photo`;

    url = `${mainURL}${clientID}${urlPage}`;
    if (query) {
      url = url + `${urlQuery}`;
    }

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const data = jsonData.hits;

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data;
        } else if (query) {
          return [...oldPhotos, ...data];
        } else {
          return [...oldPhotos, ...data];
        }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
      </section>

      {loading && <h2 className="loading">Fetching..🤗</h2>}
    </main>
  );
}

export default App;
