import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../Redux/Actions/ErrorActions";
import Loader from "./Loader";
import { getAllProducts } from "../Redux/Actions/productActions";
import HomePageCarousel from "./HomePageCarousel";
import CardProductHome from "./CardProductHome";
import './ListProduct.css';
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.ProductReducer.products);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(clearAll())
        setIsLoading(true);
        await dispatch(getAllProducts());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearAll())
      setIsLoading(false);
    };
  }, [dispatch]);

  if (isLoading) {
    return <Loader message="Loading Home..." />;
  }

  return (
    <>
      {/* Hero section */}
      {/* <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Shop-Sphere </h1>
          <p>Discover the latest trends and must-have products</p>
          <Link to="/ListProduct" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section> */}

      <section className="hero" style={{ textAlign: 'center', padding: '60px 0' }}>
        <img
          src="/logos/cover.png"
          alt="Hero Logo"
          style={{ maxWidth: '300px', width: '100%', marginBottom: '20px' }}
        />
        <button
          style={{
            padding: '10px 25px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Shop Now
        </button>
      </section>


      {/* Carousel */}
      <HomePageCarousel />

      {/* Explore Products */}
      <section className="proHome">
        <h1>Explore our products</h1>
        <div className="products-grid">
          {products?.slice(0, 3).map(el => (
            <CardProductHome key={el._id} el={el} />
          ))}
        </div>
        <Link to="/ListProduct" className="view-more-link">
          View All Products
        </Link>
      </section>

      {/* Latest Arrivals */}
      <section className="latest-arrivals">
        <h2>Latest Arrivals</h2>
        <div className="products-grid">
          {products?.slice(3, 7).map(el => (
            <CardProductHome key={el._id} el={el} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Shop-Sphere. All rights reserved.</p>
          <div className="social-links">
            {/* <a  aria-label="Facebook">Facebook</a>
            <a  aria-label="Instagram">Instagram</a>
            <a  aria-label="Twitter">Twitter</a> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
