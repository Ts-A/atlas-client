import './PopupCard.css';

const PopupCard = () => {
  return (
    <div className="card">
      <div className="field">
        <label>Title</label>
        <div>Mirapur</div>
      </div>
      <div className="field">
        <label>Description</label>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
      </div>
      <div className="field">
        <label>Rating</label>
        <div id="rating">
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
        </div>
      </div>
      <div className="field">
        <label>Review</label>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
          in ornare quam viverra orci.
        </div>
      </div>
      <div className="field information">
        <div>Ajeet</div>
        <div>2 hrs ago</div>
      </div>
    </div>
  );
};

export default PopupCard;
