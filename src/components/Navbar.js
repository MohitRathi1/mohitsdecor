// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Headset, Play, Pause } from 'lucide-react';
import '../Assets/css/Home.css';
import bgMusic from "../Assets/audio/happybirthday.mp3"; 

const Navbar = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const attemptPlay = () => {
      if (isPlaying) {
        audio.play().catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction.");
        });
      }
    };

    // Attempt to play immediately
    attemptPlay();

    // Fallback for browsers that block initial autoplay
    window.addEventListener("click", attemptPlay, { once: true });
    
    return () => window.removeEventListener("click", attemptPlay);
  }, [isPlaying]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="main-header">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={bgMusic} loop />

      <div className="header-container">
        <div className="logo-container">
          <div className="logo-ribbon">
            <span className="logo-text">Mohit's Decor</span>
          </div>
          <p className="logo-tagline">Make your party more colorful</p>
        </div>

        <nav className="header-nav">
          {/* Play/Pause Button */}
          <div className="nav-item" onClick={toggleMusic} style={{ cursor: 'pointer' }}>
            {isPlaying ? (
              <>
                <Pause className="nav-icon" />
                {/* <span>Pause</span> */}
              </>
            ) : (
              <>
                <Play className="nav-icon" />
                {/* <span>Play</span> */}
              </>
            )}
          </div>

          <div className="nav-item">
            <Headset className="nav-icon" />
            {/* <span>Contact</span> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;