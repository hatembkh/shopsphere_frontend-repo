
import Card from 'react-bootstrap/Card';
import './CardProduct.css';
import { Link } from 'react-router-dom';

const CardProductHome = ({ el }) => {


  return (
    <>
    <Link to="/ListProduct" style={{textDecoration: "none"}}>
    <Card 
    className='product-card'
    style={{
      width: "18rem",
      margin: '10px',
      height: '298px'
    }}>

      <Card.Img
        variant="top"
        src={`/${el.image.filename}`}
        alt={el.name}
        style={{
          height: '200px',
          objectFit: 'cover',
          width: '100%'
        }}
      />


      <Card.Body>

        <Card.Title className="product-title" >{el.name}</Card.Title>

      </Card.Body>
    </Card>
    </Link>
    </>
  );
};

export default CardProductHome;
