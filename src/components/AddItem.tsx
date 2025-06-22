import  { useState,  } from 'react';
import type {ChangeEvent, DragEvent} from 'react';
import {
   Upload, X, Plus, DollarSign, Tag,
  MapPin, FileText, Camera, CheckCircle
} from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { addItem, setLoading } from '../store/marketplaceSlice';
import { useNavigate } from 'react-router-dom';

type ImageFile = {
  id: number;
  file: File;
  url: string;
  name: string;
};

type FormDataType = {
  name: string;
  price: string;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  images: ImageFile[];
};


const AddItem = () => {
   const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    seller: '',
    location: '',
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Musical Instruments',
    'Furniture',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Other'
  ];

  const conditions = [
    'Brand New',
    'Like New',
    'Excellent',
    'Good',
    'Fair',
    'Poor'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (files: FileList | File[]) => {
    const cloudName = "dr51nxhzk";
    const uploadPreset = "marketplace";  

    setIsUploading(true);
    const uploadedImages: ImageFile[] = [];

    for (const file of files) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formDataUpload
        });

        const data = await res.json();

        uploadedImages.push({
          id: Date.now() + Math.random(),
          file,
          url: data.secure_url,
          name: file.name
        });

      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedImages]
    }));
    
    setIsUploading(false);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(Array.from(files));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageUpload(Array.from(files));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    dispatch(setLoading(true));

   
    setTimeout(() => {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
        category: formData.category,
        condition: formData.condition,
        description: formData.description,
        seller: formData.seller,
        location: formData.location,
        coverImage: formData.images[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        images: formData.images.map(img => img.url),
        dateAdded: new Date().toISOString().split('T')[0]
      };

     
      console.log('New item added:', newItem);
      dispatch(addItem(newItem));
      setIsSubmitting(false);
       dispatch(setLoading(false));
      setShowSuccess(true);

      
      setFormData({
        name: '',
        price: '',
        category: '',
        condition: '',
        description: '',
        seller: '',
        location: '',
        images: []
      });

      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
     setTimeout(() =>  navigate('/'), 3000);
  };

  const isFormValid = formData.name && formData.price && formData.category &&
                      formData.condition && formData.description && formData.seller &&
                      formData.location;

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Add New Item</h1>
          </div>
        </div>
      </div>

    
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle className="w-5 h-5" />
          Item added successfully!
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
         
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Photos</h2>
            </div>
            
          
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {isUploading ? 'Uploading images...' : 'Drop images here or click to upload'}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>

            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="p-6 space-y-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter item name"
              />
            </div>

           
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                placeholder="Describe your item in detail..."
              />
            </div>

            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller Name *
                </label>
                <input
                  type="text"
                  name="seller"
                  value={formData.seller}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

         
          <div className="p-6 bg-gray-50 border-t">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting || isUploading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Item...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Item
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 text-center mt-2">
              Make sure all required fields are filled out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;