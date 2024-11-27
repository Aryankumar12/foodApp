import React, { useState, useEffect } from "react";
import { ChevronDown, Upload, PlusCircle } from "lucide-react";

function RetailerDashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    price: "",
    description: "",
    history: "",
    certification: "",
    originDetails: "",
    image: null,
  });

  useEffect(() => {
    fetch("/api/retailer/food-items")
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    fetch("/api/retailer/add-food", {
      method: "POST",
      body: uploadData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Food item added successfully!");
          setFormData({
            foodName: "",
            category: "",
            price: "",
            description: "",
            history: "",
            certification: "",
            originDetails: "",
            image: null,
          });
          fetch("/api/retailer/food-items")
            .then((res) => res.json())
            .then((data) => setFoodItems(data));
        } else {
          alert("Error adding food item.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Modern Navigation */}
      <nav className="bg-white shadow-md rounded-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Retailer Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</a>
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</a>
              <a href="/profile" className="text-gray-600 hover:text-blue-600 transition duration-300">Profile</a>
              <a href="/logout" className="text-red-500 hover:text-red-700 transition duration-300">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Add Food Information */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="flex items-center mb-6">
          <PlusCircle className="mr-3 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Add Food Information</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            >
              <option value="">Select Category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Processed">Processed</option>
            </select>
            <ChevronDown className="absolute right-3 top-4 text-gray-400" />
          </div>
          
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 md:col-span-2"
            rows="3"
            required
          ></textarea>
          
          <textarea
            name="history"
            placeholder="History"
            value={formData.history}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            rows="3"
          ></textarea>
          
          <input
            type="text"
            name="certification"
            placeholder="Certification"
            value={formData.certification}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          />
          
          <input
            type="text"
            name="originDetails"
            placeholder="Origin Details"
            value={formData.originDetails}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          
          {/* Image Upload */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed border-gray-300 hover:bg-gray-100 hover:border-blue-300 group relative w-full p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="text-gray-500 group-hover:text-blue-600 mb-2" />
                  <p className="text-gray-500 group-hover:text-blue-600">
                    {formData.image ? formData.image.name : "Upload Image"}
                  </p>
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <PlusCircle className="mr-2" /> Add to Blockchain
          </button>
          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <PlusCircle className="mr-2" /> upload item
          </button>
        </form>
      </div>

      {/* View Added Products */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">View Added Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
                <th className="p-4 text-left text-gray-600 font-semibold">Product ID</th>
                <th className="p-4 text-left text-gray-600 font-semibold">Date Added</th>
                <th className="p-4 text-left text-gray-600 font-semibold">Certification</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="p-4">{item.foodName}</td>
                  <td className="p-4">{item.productId}</td>
                  <td className="p-4">{item.dateAdded}</td>
                  <td className="p-4">{item.certification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RetailerDashboard;