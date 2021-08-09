import './PopupCard.css';

const PopupCard = (props) => {
  const { pin } = props;
  const { username, title, description, review } = pin;

  return (
    <div className="card">
      <div className="field">
        <label>Title</label>
        <div>{title}</div>
      </div>
      <div className="field">
        <label>Description</label>
        <div>{description}</div>
      </div>
      <div className="field">
        <label>Rating</label>
        <div id="rating">
          <span className="material-icons">star_rate</span>
          <span className="material-icons">star_rate</span>
          <span className="material-icons">star_rate</span>
          <span className="material-icons">star_rate</span>
          <span className="material-icons">star_rate</span>
        </div>
      </div>
      <div className="field">
        <label>Review</label>
        <div>{review}</div>
      </div>
      <div className="field information">
        <div>{username}</div>
        <div>2 hrs ago</div>
      </div>
    </div>
  );
};

export default PopupCard;
