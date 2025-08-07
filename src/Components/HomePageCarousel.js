

import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import {useNavigate} from 'react-router-dom'
import './Carousel.css';

const HomePageCarousel = () => {

  const navigate = useNavigate()
  const slides = [
    {
      src: "/Carousel/Electronics.jpg",
      alt: "Electronics collection",
      caption: {
        title: "ELECTRONICS",
        description: "Discover cutting-edge technology for modern living",
        position: "left"
      }
    },
    {
      src: "/Carousel/Furniture.jpg",
      alt: "Furniture collection",
      caption: {
        title: "FURNITURE",
        description: "Minimalist designs for contemporary spaces",
        position: "center"
      }
    },
    {
      src: "/Carousel/Outfit.jpg",
      alt: "Fashion collection",
      caption: {
        title: "NEW COLLECTION",
        description: "Seasonal must-haves for your wardrobe",
        position: "right"
      }
    }
  ];

  return (
    <div className="home-carousel">
      <Carousel 
        fade 
        interval={5000}
        indicators={false}
        controls={false}
        pause={false} // This helps with smooth transitions
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <CarouselImage src={slide.src} alt={slide.alt} />
            <Carousel.Caption className={`caption-${slide.caption.position}`}>
              <div className="caption-content">
                <h3 className="caption-title">{slide.caption.title}</h3>
                <p className="caption-description">{slide.caption.description}</p>
                <button className="shop-now-btn" onClick={()=>navigate('/ListProduct')}>SHOP NOW</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="custom-indicators">
        {slides.map((_, index) => (
          <span key={index} className="indicator" />
        ))}
      </div>
      
    </div>
  );
};

export default HomePageCarousel;