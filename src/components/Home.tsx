import  { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Heart,
  Star
} from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import type { MarketplaceItem } from '../types';
import air1 from '../assets/air1.jpg';
import air2 from '../assets/air2.jpg';  
import air3 from '../assets/air2.jpg';  
import jack1 from '../assets/jack1.jpg';
import jack2 from '../assets/jack2.jpg';
import jack3 from '../assets/jack2.jpg';
import shoes1 from '../assets/shoes1.jpg';
import shoes2 from '../assets/shoes2.jpg';  
import shoes3 from '../assets/shoes2.jpg';
import watch1 from '../assets/watch1.jpg';
import watch2 from '../assets/watch2.jpg';
import watch3 from '../assets/watch2.jpg';


const mockItems: MarketplaceItem[] = [
  {
    id: 1,
    name: 'Vintage Leather Jacket',
    description: 'A classic leather jacket with a timeless design, perfect for any occasion.',
    price: '$120.00',
    category: 'Clothing',
    condition: 'Used - Good',
    seller: 'John Doe',
    location: 'New York, NY',
    dateAdded: '2023-10-01',
    coverImage: jack1,
    images: [
      jack1,
      jack2,
      jack3
    ]
  },
  {
    id: 2,
    name: 'Adidas Running Shoes',
    description: 'Comfortable running shoes with extra padding and great grip.',
    price: '$89.99',
    category: 'Footwear',
    condition: 'New',
    seller: 'Sneaker Hub',
    location: 'Los Angeles, CA',
    dateAdded: '2023-11-15',
    coverImage: shoes1,
    images: [
      shoes1,
      shoes2,
      shoes3  
    ]
  },
  {
    id: 3,
    name: 'Apple AirPods Pro',
    description: 'Wireless noise-cancelling earbuds with high-quality sound.',
    price: '$199.00',
    category: 'Electronics',
    condition: 'New',
    seller: 'Tech Store',
    location: 'San Francisco, CA',
    dateAdded: '2024-01-10',
    coverImage: air1,
    images: [
     air1,
      air2,
      air3
    ]
  },
  {
  id: 4,
  name: 'Samsung Galaxy Watch 6',
  description: 'Smartwatch with fitness tracking, AMOLED display, and seamless integration with Android.',
  price: '$249.00',
  category: 'Electronics',
  condition: 'New',
  seller: 'Gadget World',
  location: 'Seattle, WA',
  dateAdded: '2024-02-20',
  coverImage: watch1,
  images: [
    watch1,
    watch2,
    watch3
  ]
},


];

const Home = () => {
  const { items: reduxItems = [], loading, error } = useAppSelector((state) => state.marketplace);

   const items = [...mockItems, ...reduxItems];

  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) =>
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  const handleEnquire = () => {
    if (selectedItem) {
      alert(`Enquiry sent for ${selectedItem.name}! The seller will be notified.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-3xl font-bold text-gray-900">View Items</h3>
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-center text-gray-500">No items found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => openModal(item)}
            >
              <div className="relative">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{item.price}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.condition}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={selectedItem.images[currentImageIndex]}
                      alt={`${selectedItem.name} ${currentImageIndex + 1}`}
                      className="w-full h-80 object-cover rounded-lg"
                    />

                    {selectedItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedItem.images.length}
                    </div>
                  </div>

                  {selectedItem.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {selectedItem.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-20 h-16 object-cover rounded cursor-pointer transition-all ${
                            index === currentImageIndex
                              ? 'ring-2 ring-blue-500 opacity-100'
                              : 'opacity-60 hover:opacity-80'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-blue-600">{selectedItem.price}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedItem.condition}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="text-gray-900">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Seller:</span>
                      <span className="text-gray-900">{selectedItem.seller}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="text-gray-900">{selectedItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Date Added:</span>
                      <span className="text-gray-900">{selectedItem.dateAdded}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleEnquire}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center cursor-pointer justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Enquire About This Item</span>
                    </button>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
