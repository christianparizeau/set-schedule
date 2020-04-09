import React from 'react';
import ItemCard from './ItemCard';
import InputForm from './InputForm';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      distance: '',
      term: '',
      businesses: [],
      isInError: false
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
    const { location, distance, term } = this.state;
    if (parseInt(distance) > 25) { this.setState({ isInError: true }); } else {
      fetch(`/api/location?location=${location}&term=${term}&distance=${distance}`)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            this.setState({ isInError: true });
          } else if (response) {
            this.setState({ businesses: response, isInError: false });
          } else {
            this.setState({ isInError: true });
          }
        })
        .catch(() => {
          this.setState({ isInError: true });
        });
    }
  }

  clearFields(e) {
    e.preventDefault();
    this.setState({ location: '', distance: '', term: '' });
  }

  render() {
    if (this.state.isInError) {
      return (
        <>
          <InputForm handleSubmit={this.handleSubmit} clearFields={this.clearFields} fieldChange={this.fieldChange} term={this.state.term} location={this.state.location} distance={this.state.distance} />
          <h4>Something went wrong. Please try again</h4>
          <h2 className="error">Zip Code must be valid</h2>
          <h2 className="error">Distance must be 25 miles or less</h2>
        </>
      );
    } else {
      return (
        <>
          <InputForm handleSubmit={this.handleSubmit} clearFields={this.clearFields} fieldChange={this.fieldChange} term={this.state.term} location={this.state.location} distance={this.state.distance}/>
          <div className="card-container">
            {this.state.businesses.map((business, index) => (
              <ItemCard imagePath={business.image_url} key={index} name={business.name}
                rating={business.rating} address = {business.location.display_address.join(' ')}
                phone={business.phone} link={business.url}
              />
            ))}
          </div>
        </>
      );
    }
  }
}
