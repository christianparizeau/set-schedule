import React from 'react';
export default function ItemCard({ imagePath, name, rating, address, phone, link }) {
  return (
    <div className="card">
      <img className="card-image" src={imagePath} alt={name} />
      <div className="info">
        <div className="name"><h3>{name}</h3></div>
        <div className="rating"><h3>Rating: {rating}</h3></div>
        <div className="address"><a rel="noopener noreferrer"target="_blank" href={`http://maps.google.com/?q=${address}`}><h3>{address}</h3></a></div>
        <div className="phone"><a href={`tel:${phone}`}>{phone}</a></div>
        <div className="yelp"><a rel="noopener noreferrer" target="_blank" href={link}>On Yelp!</a></div>
      </div>
    </div>
  );
}
