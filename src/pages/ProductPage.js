import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/product.json';

const ProductPage = () => {
    const { id } = useParams();
    console.log("Product ID from URL:", id);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    
    // City selection state
    const [selectedCity, setSelectedCity] = useState("Ichalkaranji");
    const availableCities = ["Ichalkaranji", "Aurangabad", "Pune", "Mumbai", "Kolhapur"];
    const isAvailable = selectedCity === "Ichalkaranji";

    useEffect(() => {
        const productId = Number(id);
        // Fixed: Use triple equals for comparison
        //this =, ==, === is cousing issue in finding product, it should be === instead of =, my logic is working only in == 
        const foundProduct = productsData.find(p => p.id === productId); 
        console.log("Found Product:", foundProduct);
        if (foundProduct) {
            setProduct(foundProduct);
            try {
                const initialImg = require(`../Assets/img/product/${foundProduct.imageFolder}/1.png`);
                setMainImage(initialImg);
            } catch (err) {
                console.error("Image not found", err);
            }
        }
    }, [id]);
        const currentUrl ="https://mohitsdecor.vercel.app/product/" + id;

    // Handle WhatsApp Customization Enquiry
    const handleWhatsAppCustomization = () => {
        const phoneNumber = "+918208239407"; // Ensure country code is included
        const currentUrl ="https://mohitsdecor.vercel.app/product/" + id;
        const message = `Hello Mohit's Decor! I am interested in this %0ADecor: ${product.name}%0A%0A ${currentUrl}`;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    // Handle Native Share (WhatsApp/Socials)
    const handleShare = async () => {
        const shareData = {
            title: product.name,
            url: currentUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for desktop browsers
                const waMessage = `Check this out: ${product.name} - ${window.location.href}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, '_blank');
            }
        } catch (err) {
            console.log("Error sharing:", err);
        }
    };

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const thumbnails = Array.from({ length: product.imagesCount }, (_, i) => i + 1);

    return (
        <div className="container my-5">
            <div className="row g-4">
                {/* Left: Gallery Section */}
                <div className="col-lg-7">
                    <div className="d-flex flex-column-reverse flex-md-row gap-3">
                        <div className="d-flex flex-md-column gap-2 overflow-auto">
                            {thumbnails.map((num) => {
                                const thumbSrc = require(`../Assets/img/product/${product.imageFolder}/${num}.png`);
                                return (
                                    <img 
                                        key={num}
                                        src={thumbSrc}
                                        alt="thumb"
                                        className={`img-thumbnail shadow-sm ${mainImage === thumbSrc ? 'border-primary border-2' : ''}`}
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => setMainImage(thumbSrc)}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex-grow-1 position-relative">
                            <img 
                                src={mainImage} 
                                alt={product.name} 
                                className="img-fluid rounded shadow w-100" 
                                style={{ maxHeight: '550px', objectFit: 'cover' }}
                            />
                            {/* Share Button Floating over Image */}
                            <button 
                                onClick={handleShare}
                                className="btn btn-light btn-sm position-absolute top-0 end-0 m-3 shadow-sm rounded-circle"
                                style={{ width: '40px', height: '40px' }}
                                title="Share Product"
                            >
                                🔗
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Content Section */}
                <div className="col-lg-5">
                    <div className="d-flex justify-content-between align-items-start">
                        <h1 className="fw-bold h2">{product.name}</h1>
                        <button className="btn btn-outline-dark btn-sm rounded-pill px-3" onClick={handleShare}>
                            Share
                        </button>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 my-3">
                        <span className="h3 fw-bold mb-0">₹{product.price}</span>
                        <span className="text-muted text-decoration-line-through">₹{product.originalPrice}</span>
                        <span className="badge bg-success">{product.discount}</span>
                    </div>

                    <div className="card border-0 bg-light mb-4">
                        <div className="card-body">
                            <h5 className="fw-bold">Product Details:</h5>
                            <ul className="mb-0">
                                {product.details.map((point, index) => (
                                    <li key={index} className="mb-1 text-secondary">{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="p-3 border rounded mb-4 d-flex justify-content-between align-items-center bg-white shadow-sm">
                        <div>
                            <p className="mb-0 fw-bold dropdown-toggle cursor-pointer" data-bs-toggle="dropdown">
                                📍 Your City - {selectedCity}
                            </p>
                            <ul className="dropdown-menu shadow">
                                {availableCities.map((city) => (
                                    <li key={city}>
                                        <button className="dropdown-item" onClick={() => setSelectedCity(city)}>{city}</button>
                                    </li>
                                ))}
                            </ul>
                            {isAvailable ? (
                                <small className="text-success fw-medium">Yes, we are available in your city</small>
                            ) : (
                                <small className="text-danger fw-medium">Sorry, we are not available in {selectedCity}</small>
                            )}
                        </div>
                        <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="dropdown">Change</button>
                    </div>

                    {/* Updated WhatsApp Customization Box */}
                    <div className="whatsapp-box p-3 border border-success rounded bg-light mb-3 d-flex justify-content-between align-items-center shadow-sm">
                        <p className="mb-0 small fw-bold text-success">Looking for Customized Decor?</p>
                        <button 
                            onClick={handleWhatsAppCustomization}
                            className="btn btn-success btn-sm px-3 fw-bold"
                        >
                            WhatsApp Us
                        </button>
                    </div>

                    <a href="tel:8208239407" className="text-decoration-none">
                        <button className="btn btn-danger btn-lg w-100 py-3 fw-bold mb-3 shadow">
                            Make Enquiry →
                        </button>
                    </a>
                    
                    <p className="text-center text-muted small">
                        #1 Decoration Website India | In collaboration with 100+ Event Decors
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;