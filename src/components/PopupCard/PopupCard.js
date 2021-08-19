import './PopupCard.css';
import moment from 'moment';
import marina from '../../images/marina.jpg';

const PopupCard = (props) => {
  const { pin, togglePopup } = props;
  const {
    username,
    title,
    description,
    rating,
    createdAt,
    latitude,
    longitude,
  } = pin;

  return (
    <div className="place-card">
      <span onClick={() => togglePopup(false)} className="material-icons close">
        close
      </span>
      <div className="field-image">
        <img src={marina} alt="marina beach" />
      </div>
      <div className="field-information">
        <div className="field-title">
          <span className="title">{title}</span>
          <div>
            {Array(rating).fill(
              <span class="material-icons star">star_rate</span>
            )}
          </div>
        </div>
        <div className="field-content">
          {description.length > 100 ? (
            <div className="description">{description.substr(0, 100)}...</div>
          ) : (
            <div className="description">{description}</div>
          )}
          <div>
            <span className="latlng">Latitude:</span>
            {String(latitude).substr(0, 7)}&deg;
          </div>
          <div>
            <span className="latlng">Longitude:</span>
            {String(longitude).substr(0, 7)}&deg;
          </div>
        </div>
        <div className="field-other">
          <div className="author">{username}</div>
          <div className="created">{moment(createdAt).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
