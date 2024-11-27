import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Receipt 
} from "lucide-react";

const CartPage = () => {
  const [cart, setCart] = useState([
    { 
      id: 1, 
      name: "Fresh Apples", 
      price: 4.99, 
      quantity: 2,
      image: "/api/placeholder/100/100?text=Apples",
      certification: "Organic"
    },
    { 
      id: 2, 
      name: "Whole Wheat Bread", 
      price: 3.50, 
      quantity: 1,
      image: "/api/placeholder/100/100?text=Bread",
      certification: "Non-Organic"
    }
  ]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, newQuantity) }
        : item
    ).filter(item => item.quantity > 0));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8">
          <ShoppingCart className="mr-4 text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items Column */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md p-4 flex items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.certification}</p>
                    <p className="text-gray-800">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 p-2 rounded-full"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 p-2 rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => updateQuantity(item.id, 0)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Receipt className="mr-2 text-blue-600" />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between"
                  >
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <button 
                className="w-full bg-blue-500 text-white p-3 rounded-lg mt-6 hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-xl text-gray-700">Your cart is empty</p>
            <p className="text-gray-500 mb-6">Explore our products and add some items!</p>
            <button 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;