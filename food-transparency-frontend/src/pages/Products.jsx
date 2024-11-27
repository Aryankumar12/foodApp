// src/pages/Products.js
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="mt-4 text-primary font-bold">${product.price}</p>
        <button className="mt-4 bg-primary text-white py-2 px-4 rounded w-full hover:bg-primary-dark transition duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

function Products() {
  // Example product data
  const products = [
    { id: 1, name: 'Organic Apple', description: 'Fresh organic apples', price: '1.20', image: '/path-to-image.jpg' },
    // Add more products as needed
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default Products;


