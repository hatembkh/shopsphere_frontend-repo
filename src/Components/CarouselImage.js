const CarouselImage = ({ src, alt, text }) => {
  return (
    <div className="carousel-image-container">
      <img
        src={src}
        alt={alt}
        className="carousel-img"
        loading="lazy"
      />
      {text && (
        <div className="carousel-image-label">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default CarouselImage;