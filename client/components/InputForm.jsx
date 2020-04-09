import React from 'react';

export default function InputForm({ handleSubmit, clearFields, fieldChange, term, distance, location }) {
  return (
    <div className="input">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="location">
          <input type="text" name='location' pattern="[0-9]*" maxLength='5' required placeholder='Zip Code' title="Please enter a valid 5-digit US Zip Code" onChange={fieldChange} value={location} />
        </div>
        <div className="distance">
          <input type="text" name='distance' required pattern="[0-9]{0,2}" placeholder='Search Distance (in Miles)' title="Please enter a positive distance less than 25 miles" onChange={fieldChange} value={distance} />
        </div>
        <div className="term">
          <input type="text" name='term' required placeholder="Area of Interest" title="" onChange={fieldChange} value={term} />
        </div>
        <div className="buttons">
          <button type="button" className="clear-button" onClick={clearFields}>
          Clear Fields
          </button>
          <button className="submit-button">
          Go!
          </button>
        </div>
      </form>
    </div>
  );
}
