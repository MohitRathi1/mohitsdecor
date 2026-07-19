import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import '../Assets/css/Home.css';
import carouselData from '../data/carousel.json';
import categories from '../data/categories.json';
import videoData from '../data/trending_videos.json';
import { Link } from 'react-router-dom';

const cyclingWords = ['Shower', 'Welcome', 'First Birthday'];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % cyclingWords.length);
        setWordVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="balloons-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="balloon"></div>
        ))}
      </div>

      <main className="content-container">
        <section className="hero-section">
          {carouselData.map((item, index) => (
            <div
              key={item.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundColor: item.bg || '#ffe6f0' }}
            >
              
              <img
                src={`/img/carousel/${item.id}.png`}
                alt={item.title}
                className="hero-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x400?text=Banner+Image'; }}
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h2 className="hero-offer">{item.offer}</h2>
                  <p className="hero-subtitle">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="section-title-group">
          <h1>
            <span className="title-gradient-text">Baby </span>
            <span className={`cycling-word ${wordVisible ? 'word-visible' : 'word-hidden'}`}>
              {cyclingWords[wordIndex]}
            </span>
            <span className="title-gradient-text"> Specials</span>
          </h1>
          <p>Welcome the little one with decor as sweet as the moment!</p>
        </div>

       <section className="categories-grid">
  {categories.map((cat) => (
    <Link
      to={`/categoryid/${cat.id}`}
      key={cat.id}
      className="category-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {/* Container clips everything inside a clean circle */}
      <div className="category-image-wrapper position-relative" style={{ borderRadius: '50%', overflow: 'hidden' }}>
        
        <img
          src={`/img/categories/${cat.id}.jpg`}
          alt={cat.name}
          style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Category'; }}
        />
        
        {/* Adjusted placement: Lowered slightly and pulled right to follow the inner circle curve perfectly */}
        {cat.Tag && (
          <span 
            className="position-absolute badge rounded-pill bg-success shadow-sm d-inline-flex align-items-center justify-content-center"
            style={{ 
              bottom: '18px',         /* Moved down further so it clears the extreme top edge */
              left: '50%',        /* Want to make it center horizontally */
              transform: 'translateX(-50%)', /* Fine-tune horizontal centering */
              zIndex: 99, 
              fontSize: '10px',    /* Slightly smaller font to keep long text looking neat */
              padding: '4px 8px',
              whiteSpace: 'nowrap',
              lineHeight: '1'
            }}
          >
            {cat.Tag}
          </span>
        )}
        
        <div className="category-card-overlay" style={{ borderRadius: '50%', zIndex: 5 }}>
          <ChevronRight className="cat-arrow" size={16} />
        </div>
      </div>
      
      <span className="category-name">{cat.name}</span>
    </Link>
  ))}
</section>
        

        <div className="section-header">
          <h2>Trending Videos</h2>
          <button className="view-all-btn">View All <ChevronRight size={16} /></button>
        </div>

        <section className="products-grid">
          {videoData.map((video) => (
            <div key={video.id} className="product-card">
              {video.tag && <span className="product-tag">{video.tag}</span>}
              <div className="product-image-container">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="product-image"
                />
                <div className="play-overlay">▶</div>
              </div>
              <div className="product-info">
                <div className="product-title-row">
                  <h3 className="product-name">{video.title}</h3>
                </div>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
                style={{ position: "absolute", inset: 0, textIndent: "-9999px", overflow: "hidden" }}
              >
                Watch
              </a>
            </div>
          ))}
        </section>
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