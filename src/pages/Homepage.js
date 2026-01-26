import React, { useState, useEffect } from 'react';
import { Search, Headset, ShoppingCart, User, Star, ChevronRight } from 'lucide-react';
import '../Assets/css/Home.css';
import carouselData from '../data/carousel.json';
import categories from '../data/categories.json';
import products from '../data/products.json';
import videoData from '../data/trending_videos.json';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 5000); // Slides every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-wrapper">
      <header className="main-header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-ribbon">
              <span className="logo-text">Mohit's Decor</span>
            </div>
            <p className="logo-tagline">Make your party more colorful</p>
          </div>          
          {/* <div className="search-bar-container">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Search for decorations..." className="search-input" />
              <Search className="search-icon" />
            </div>
          </div> */}
          <nav className="header-nav">
            <div className="nav-item"><Headset className="nav-icon" /><span>Contact</span></div>
            {/* <div className="nav-item"><ShoppingCart className="nav-icon" /><span>Cart</span></div>
            <div className="nav-item"><User className="nav-icon" /><span>Signup</span></div> */}
          </nav>
        </div>
      </header>

      <main className="content-container">
        {/* --- Dynamic Auto-Slide Hero Carousel --- */}
        <section className="hero-section">
          {carouselData.map((item, index) => (
            <div 
              key={item.id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                /* Dynamically linking to your local folder by ID */
                src={require(`../Assets/img/carousel/${item.id}.png`)} 
                alt={item.title} 
                className="hero-image"
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h2 className="hero-offer">{item.offer}</h2>
                  <p className="hero-subtitle">{item.title}</p>
                  <a href={item.link} className="book-now-btn">Book Now</a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="section-title-group">
          <h1>Happy Republic day</h1>
          <p>Proud to be Indian, Celebrate freedom, celebrate India!</p>
        </div>

      {/* --- Categories Section --- */}
<section className="categories-grid">
  {categories.map((cat, index) => (
    <div key={cat.id} className="category-card">
      <div className="category-image-wrapper">
        <img 
          /* Dynamically loading local images based on ID */
          src={require(`../Assets/img/categories/${cat.id}.jpg`)} 
          alt={cat.name} 
        />
        <div className="category-card-overlay">
           <ChevronRight className="cat-arrow" size={16} />
        </div>
      </div>
      <span className="category-name">{cat.name}</span>
    </div>
  ))}
</section>


<div className="section-header">
  <h2>Trending Videos</h2>
  <button className="view-all-btn">View All <ChevronRight size={16} /></button>
</div>

<section className="products-grid">  {/* you can keep same class or rename to video-grid */}
  {videoData.map((video) => (
    <div key={video.id} className="product-card">  {/* reuse style or create video-card */}
      {video.tag && <span className="product-tag">{video.tag}</span>}
      
      <div className="product-image-container">
        {/* YouTube thumbnail – works for both shorts & long videos */}
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="product-image"
        />
        
        {/* Optional: small play icon overlay */}
        <div className="play-overlay">
          ▶
        </div>
      </div>

      <div className="product-info">
        <div className="product-title-row">
          <h3 className="product-name">{video.title}</h3>
          {/* You can add views/likes later if you want */}
        </div>
        
        {/* <div className="price-row" style={{ justifyContent: "flex-start" }}>
          <span style={{ color: "#ff0000", fontWeight: "bold" }}>
            {video.type === "short" ? "YouTube Shorts" : "Watch Video"}
          </span>
        </div> */}
      </div>

      {/* Optional link to open video */}
      <a
        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="watch-btn"
        style={{
          position: "absolute",
          inset: 0,
          textIndent: "-9999px",
          overflow: "hidden"
        }}
      >
        Watch
      </a>
    </div>
  ))}
</section>
        {/* <section className="products-grid">
          {products.map((item, index) => (
            <div key={index} className="product-card">
              {item.tag && <span className="product-tag">{item.tag}</span>}
              <div className="product-image-container">
                <img src={item.image} alt={item.name} className="product-image" />
              </div>
              <div className="product-info">
                <div className="product-title-row">
                  <h3 className="product-name">{item.name}</h3>
                  <div className="product-rating">{item.rating} <Star className="star-icon" /></div>
                </div>
                <div className="price-row">
                  <span className="current-price">₹{item.price}</span>
                  <span className="old-price">₹{item.originalPrice}</span>
                  <span className="discount-tag">{item.discount}% Off</span>
                </div>
              </div>
            </div>
          ))}
        </section> */}
      </main>

      <a href="https://wa.me/+918208239407" className="whatsapp-float">
        <svg viewBox="0 0 24 24" className="whatsapp-icon">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.651 2.316 2.437-.64c.915.514 1.946.786 2.956.786 3.18 0 5.767-2.587 5.768-5.769 0-3.181-2.587-5.763-5.767-5.763zm3.526 8.2c-.146.411-.848.784-1.164.827-.315.044-.63.076-1.74-.361-.433-.171-1.025-.436-1.718-1.024-1.127-.958-1.841-2.122-2.01-2.408-.17-.286-.017-.439.123-.579.126-.127.283-.329.424-.494.14-.166.188-.283.283-.472.094-.188.047-.353-.024-.494-.07-.141-.637-1.532-.872-2.098-.228-.551-.459-.476-.63-.485-.164-.008-.353-.01-.542-.01s-.494.07-.753.353c-.26.283-.99 1.011-.99 2.47s1.059 2.87 1.2 3.059c.142.19 2.083 3.181 5.046 4.462.705.305 1.255.487 1.683.623.708.226 1.352.194 1.861.118.567-.085 1.738-.711 1.983-1.398.247-.687.247-1.275.172-1.398-.073-.124-.27-.197-.565-.343z"/>
        </svg>
      </a>
    </div>
  );
};

export default Home;