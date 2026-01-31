import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/product.json';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    
    // City selection state
    const [selectedCity, setSelectedCity] = useState("Ichalkaranji");
    const availableCities = ["Ichalkaranji", "Aurangabad", "Pune", "Mumbai", "Kolhapur"];
    const isAvailable = selectedCity === "Ichalkaranji";

    useEffect(() => {
        const foundProduct = productsData.find(p => p.id == id);
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
                        {/* Thumbnails */}
                        <div className="d-flex flex-md-column gap-2 overflow-auto">
                            {thumbnails.map((num) => (
                                <img 
                                    key={num}
                                    src={require(`../Assets/img/product/${product.imageFolder}/${num}.png`)}
                                    alt="thumb"
                                    className={`img-thumbnail shadow-sm cursor-pointer ${mainImage === require(`../Assets/img/product/${product.imageFolder}/${num}.png`) ? 'border-primary' : ''}`}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => setMainImage(require(`../Assets/img/product/${product.imageFolder}/${num}.png`))}
                                />
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-grow-1">
                            <img 
                                src={mainImage} 
                                alt={product.name} 
                                className="img-fluid rounded shadow w-100" 
                                style={{ maxHeight: '550px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Content Section */}
                <div className="col-lg-5">
                    <h1 className="fw-bold h2">{product.name}</h1>
                    
                    <div className="d-flex align-items-center gap-3 my-3">
                        <span className="h3 fw-bold mb-0">₹{product.price}</span>
                        <span className="text-muted text-decoration-line-through">₹{product.originalPrice}</span>
                        <span className="badge bg-success">{product.discount}</span>
                    </div>

                    {/* <div className="mb-3">
                        <span className="text-warning fw-bold">★ {product.rating}</span>
                        <span className="text-muted ms-2">({product.reviews} reviews)</span>
                    </div> */}

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

                    {/* Location Section with Dropdown */}
                    <div className="p-3 border rounded mb-4 d-flex justify-content-between align-items-center bg-white shadow-sm">
                        <div className="dropdown">
                            <p 
                                className="mb-0 fw-bold dropdown-toggle cursor-pointer" 
                                data-bs-toggle="dropdown" 
                                style={{ cursor: 'pointer' }}
                            >
                                📍 Your City - {selectedCity}
                            </p>
                            <ul className="dropdown-menu shadow">
                                {availableCities.map((city) => (
                                    <li key={city}>
                                        <button className="dropdown-item" onClick={() => setSelectedCity(city)}>
                                            {city}
                                        </button>
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

                    <div className="whatsapp-box p-3 border border-success rounded bg-light mb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0 small fw-bold">Looking for Customized Decor?</p>
                        <button className="btn btn-success btn-sm px-3">WhatsApp Us</button>
                    </div>

                    {/* Enquiry Button - Redirects to Phone Call */}
                    <a href="tel:9455122252" className="text-decoration-none">
                        <button className="btn btn-danger btn-lg w-100 py-3 fw-bold mb-3 shadow">
                            Make Enquiry →
                        </button>
                    </a>
                    
                    <p className="text-center text-muted small">
                        #1 Decoration Website India | In collaboration with 100+ Event Decors                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;