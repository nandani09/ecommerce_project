  import React from 'react';

  function ProductCard({ product, addToCart }) {
    const price = parseFloat(product.price);
    const imageSrc = product.image || '/images/placeholder.png';

    return (
      <div 
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          margin: '10px',
          width: '150px',
          textAlign: 'center',
        }}
      >
        <img
          src={imageSrc}
          alt={product.name}
          style={{ width: '100px', height: '100px', objectFit: 'contain' }}
          onError={(e) => e.target.src = '/images/placeholder.png'}
        />
        <h3>{product.name}</h3>
        <p>Price: ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}</p>
        {product.stock > 0 ? (
          <p>Stock: {product.stock}</p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Item unavailable</p>
        )}
        <p>Branch: {product.branch}</p>
        <p>Description: {product.description || 'No description available'}</p>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)} 
          style={{ 
            background: '#28a745', 
            color: 'white', 
            padding: '5px 10px', 
            border: 'none', 
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }

  export default ProductCard;
