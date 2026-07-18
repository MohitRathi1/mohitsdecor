import React from 'react';
import { useParams, Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import productsData from '../data/product.json';

const ProductCard = ({ product }) => {
  const imgSrc = `/img/product/${product.imageFolder}/1.png`;
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  return (
<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mb-md-4">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <div
          className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm"
          style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          <div style={{ height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
            <img
              src={imgSrc}
              alt={product.name}
              className="w-100 h-100"
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onError={e => { e.target.src = '/img/placeholder.png'; e.target.onerror = null; }}
            />
          </div>

          <div className="card-body p-3">
            <h6 className="fw-bold mb-2 lh-sm" style={{ fontSize: '0.85rem', minHeight: '2.4em' }}>
              {product.name}
            </h6>
            {product.description && (
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                {product.description}
              </p>
            )}
{/* if price is 0 then remove price and discount too  */}

             <div className="d-flex align-items-center flex-wrap gap-1 mb-1">
              {product.price !== 0 && (
                <span className="fw-bold" style={{ fontSize: '1rem' }}>₹{product.price}</span>
              )}
              {product.originalPrice !== 0 && (
                <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.78rem' }}>
                  ₹{product.originalPrice}
                </span>
              )}
              
              <span className="badge bg-success" style={{ fontSize: '0.65rem' }}>
                {product.discount}
              </span>
            </div>

            <div className="d-flex align-items-center gap-1">
              <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>{stars}</span>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>({product.reviews})</span>
            </div>
          </div>

          <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
            <span
              className="btn btn-danger btn-sm w-100 fw-bold"
              style={{ fontSize: '0.8rem' }}
            >
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CategoryPage = () => {
  const { id } = useParams();

  const isAll = !id;
  const category = isAll ? null : categoriesData.find(c => c.id === Number(id));

  if (!isAll && !category) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center text-muted">
          <h3>Category not found</h3>
          <Link to="/" className="btn btn-outline-danger mt-3">Back to Home</Link>
        </div>
      </div>
    );
  }

  const products = isAll
    ? productsData
    : productsData.filter(p => category.Products.includes(p.id));

  const title = isAll ? 'All Decorations' : category.name;
  const description = isAll ? 'Explore all our decorations' : category.Description || '';

  return (
    <div className="container my-3 my-md-5 px-3 px-md-4">
      <div className="mb-3 mb-md-4">
        <Link to="/" className="text-muted text-decoration-none small">
          ← Back to Home
        </Link>
        <h2 className="fw-bold mt-2 mb-1" style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)' }}>{title}</h2>
        {description && <p className="text-muted mb-2" style={{ fontSize: '0.9rem', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>{description}</p>}
        <p className="text-muted mb-0">
          {products.length} {products.length !== 1 ? '' : ''} available
        </p>
      </div>

      <div className="row g-2 g-md-4">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5 text-muted">
            <p>No products available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
