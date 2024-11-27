import React, { useState } from "react";
import {
  Search,
  Filter,
  Info,
  Utensils,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate(); // Use hook to navigate programmatically

  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      category: "Fruits",
      price: 45,
      certification: "Organic",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFMzVXnpIZG1skrJskB4D4oPePoLxMHSo4Lg&s"
    },
    {
      id: 2,
      name: "Crunchy Carrots",
      category: "Vegetables",
      price: 55,
      certification: "Non-Organic",
      image: "https://media.istockphoto.com/id/1388403435/photo/fresh-carrots-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=XmrTb_nASc7d-4zVKUz0leeTT4fibDzWi_GpIun0Tlc="
    },
    {
      id: 3,
      name: "Healthy Granola",
      category: "Snacks",
      price: 75,
      certification: "Organic",
      image: "https://media.istockphoto.com/id/1263686908/photo/mixed-salty-snack-flat-lay-table-scene-on-a-wood-background.jpg?s=612x612&w=0&k=20&c=rCZ-gpvz--NpeNA0cYGCyJj3EK0kFUSkvdsow9u4I3o="
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    certification: "",
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (food) => {
    alert(`${food.name} has been added to your cart!`);
    navigate("/cart"); // Navigate to cart page
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredFoodItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === "" || item.category === filters.category;
    const matchesPriceRange =
      filters.priceRange === "" ||
      (filters.priceRange === "low" && item.price < 50) ||
      (filters.priceRange === "medium" && item.price >= 50 && item.price <= 100) ||
      (filters.priceRange === "high" && item.price > 100);
    const matchesCertification =
      filters.certification === "" ||
      item.certification === filters.certification;

    return matchesSearch && matchesCategory && matchesPriceRange && matchesCertification;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Utensils className="mr-2 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Food Transparency</h1>
          </div>
          <div className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/products" className="text-gray-600 hover:text-blue-600">Products</a>
            <a href="/history" className="text-gray-600 hover:text-blue-600">History</a>
            <a href="/profile" className="text-gray-600 hover:text-blue-600">Profile</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Product Name"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Snacks">Snacks</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400" />
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Price Ranges</option>
                <option value="low">Below $50</option>
                <option value="medium">$50 - $100</option>
                <option value="high">Above $100</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400" />
            </div>

            {/* Certification Filter */}
            <div className="relative">
              <select
                name="certification"
                value={filters.certification}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Certifications</option>
                <option value="Organic">Organic</option>
                <option value="Non-Organic">Non-Organic</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{food.name}</h3>
                <p className="text-gray-600">{food.category}</p>
                <p className="text-gray-600">${food.price}</p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  onClick={() => setSelectedFood(food)}
                >
                  View Details
                </button>
                <button
                  className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  onClick={() => handleAddToCart(food)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Food Details Modal */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-4/5 max-h-[90vh] flex overflow-hidden">
              {/* Left Side: Image */}
              <div className="w-1/2">
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-1/2 p-8 flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoXgnU7FduTcy0Z7GyoXnMnCqLBwMwAXdiFw&s"
                    alt="QR Code"
                    className="w-48 h-48 object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-4">{selectedFood.name}</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 font-semibold">Category</p>
                    <p>{selectedFood.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Price</p>
                    <p>${selectedFood.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Certification</p>
                    <p>{selectedFood.certification}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFood(null)}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                >
                  <Info className="mr-2" /> Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
