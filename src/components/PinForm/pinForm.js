import { useEffect, useState } from 'react';
import './pinForm.css';
import { defaultFormState } from '../../defaultStates';

const PinForm = (props) => {
  const { submitHandler, place } = props;
  const [formData, setFormData] = useState(defaultFormState);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(place);
  }, [place]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate(data);
    submitHandler(formData);
    setFormData(defaultFormState);
  };

  return (
    <form className="pinform" onSubmit={handleSubmit}>
      <div className="form-image">
        {place.isSet && (
          <img
            src={
              place?.relatedImages[0]?.urls?.raw
                ? place.relatedImages[0].urls.raw
                : 'https://ak.picdn.net/shutterstock/videos/28831216/thumb/1.jpg'
            }
            alt={'red petaled flowers in bloom'}
          />
        )}
      </div>
      <div className="form-inputs">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            name="description"
            cols="20"
            rows="5"
            onChange={handleInputChange}
            value={formData.description}
          ></textarea>
        </div>
        <div className="field">
          <label>Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            name="rating"
            onChange={handleInputChange}
            value={formData.rating}
          />
        </div>
        <div className="field">
          <label>Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="field">
          <button type="submit">Add Pin</button>
        </div>
      </div>
    </form>
  );
};

export default PinForm;
