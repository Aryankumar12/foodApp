import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Quote, ChefHat, Utensils } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Home() {
  const slides = [
    {
      img: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Culinary Creations',
      description: 'Explore the art of cooking and innovative cuisine'
    },
    {
      img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
      caption: 'Discover Fresh Ingredients',
      description: 'Sourcing the finest, freshest produce from local farms'
    },
    {
      img: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Exquisite Dining Experiences',
      description: 'Transforming meals into unforgettable memories'
    }
  ];

  const quotes = [
    {
      text: "One cannot think well, love well, sleep well, if one has not dined well.",
      author: "Virginia Woolf"
    },
    {
      text: "Food is symbolic of love when words are inadequate.",
      author: "Alan D. Wolfelt"
    },
    {
      text: "Cooking is at once child's play and adult joy. And cooking done with care is an act of love.",
      author: "Craig Claiborne"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Placeholder */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Utensils className="mr-2 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Food Transparency</h1>
          </div>
          <div className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/menu" className="text-gray-600 hover:text-blue-600">Menu</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-[70vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            renderBullet: (index, className) => 
              `<span class="${className} bg-white bg-opacity-50 hover:bg-opacity-100"></span>`
          }}
          navigation
          spaceBetween={0}
          slidesPerView={1}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <img
                src={slide.img}
                alt={slide.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                <ChefHat className="w-16 h-16 mb-4 text-white" />
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{slide.caption}</h2>
                <p className="text-xl max-w-xl mx-auto drop-shadow-md">{slide.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Quotes Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center flex items-center justify-center">
            <Quote className="mr-4 text-blue-600" />
            Food for Thought
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <p className="text-lg text-gray-700 italic mb-4 relative pl-6">
                  <span className="absolute left-0 top-0 text-blue-500 text-4xl opacity-20">"</span>
                  {quote.text}
                </p>
                <p className="text-right text-gray-500 font-semibold">- {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Food Transparency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;