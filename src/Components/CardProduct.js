
import Card from 'react-bootstrap/Card';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CardProduct.css';

const CardProduct = ({ el }) => {
 

  return (
    <Card className="product-card">
      <Link to={`/DescProduct/${el._id}`} className="product-image-wrapper">
        <Card.Img
          variant="top"
          src={`/${el.image.filename}`}
          alt={el.name}
          className="product-image"
        />
        {el.price && <div className="price-tag">${el.price.toFixed(2)}</div>}
      </Link>

      <Card.Body>
        <Link to={`/DescProduct/${el._id}`} className="product-title-link">
          <Card.Title className="product-title">{el.name}</Card.Title>
        </Link>

        <div className="product-meta">
          <div><strong>Release:</strong> {el.releaseDate}</div>
          <div><strong>Stock:</strong> {el.stockQty === 0 ? 'Out of stock' : el.stockQty}</div>
          <div><strong>Category:</strong> {el.category}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
