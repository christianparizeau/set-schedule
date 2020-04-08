import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      distance: '',
      topic: ''
    };
    this.fieldChange = this.fieldChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fieldChange(e) {
    const newState = {};
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    // fetch call to backend
  }

  clearFields(e) {
    e.preventDefault();
    this.setState({ location: '', distance: '', topic: '' });
  }

  render() {
    return (
      <>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="location">
            <input type="text" name='location' pattern="[0-9]*" maxLength='5' required placeholder='Zip Code' title="Please enter a valid 5-digit US Zip Code" onChange={this.fieldChange} value={this.state.location}/>
          </div>
          <div className="distance">
            <input type="text" name='distance' required pattern="[0-9]{0,2}" placeholder='Search Distance (in Miles)' title="Please enter a positive distance less than 100 miles" onChange={this.fieldChange} value={this.state.distance}/>
          </div>
          <div className="topic">
            <input type="text" name='topic' required placeholder="Area of Interest" title="" onChange={this.fieldChange} value={this.state.topic}/>
          </div>
          <div className="buttons">
            <button className="submit-button">
            Go!
            </button>
            <button className="clear-button" onClick={this.clearFields}>
            Clear Fields
            </button>
          </div>
        </form>
      </>
    );
  }
}
