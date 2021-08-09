import { useState } from 'react';
import './pinForm.css';

const defaultState = {
  title: '',
  description: '',
  rating: 5,
  review: '',
};

const PinForm = (props) => {
  const { submitHandler } = props;
  const [formData, setFormData] = useState(defaultState);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate(data);
    submitHandler(formData);
    setFormData(defaultState);
  };

  return (
    <form className="pinform" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default PinForm;
