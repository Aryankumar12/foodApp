// src/pages/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold">Product Details - {id}</h2>
      <p className="mt-4">Here we would show the details of the product.</p>
    </div>
  );
}

export default ProductDetails;

