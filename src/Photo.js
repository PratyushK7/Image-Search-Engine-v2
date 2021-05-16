import react from "react";
import avatar from "./Resources/avatar-2.png";

const Photo = ({ largeImageURL, tags, userImageURL, downloads, user }) => {
  return (
    <article className="photo">
      <img src={largeImageURL} alt={tags} />
      <div className="photo-info">
        <div>
          <h4>{tags}</h4>
          <p>{downloads} 💕</p>
        </div>
        <a>
          <img
            src={userImageURL.length !== 0 ? userImageURL : avatar}
            alt={user}
            className="user-img"
          />
        </a>
      </div>
    </article>
  );
};

export default Photo;
