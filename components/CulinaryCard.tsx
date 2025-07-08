// components/CulinaryCard.tsx
import Image from 'next/image'
import { CulinaryItem, culinaryCategories } from '@/data/culinary'
import { Star, Clock, Users, MapPin, Phone, Leaf, Heart } from 'lucide-react'

interface CulinaryCardProps {
  item: CulinaryItem
}

export default function CulinaryCard({ item }: CulinaryCardProps) {
  const categoryInfo = culinaryCategories[item.category]

  return (
    <div className={`${categoryInfo.bgColor} border-4 ${categoryInfo.borderColor} rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 ${categoryInfo.color} text-white px-4 py-2 rounded-xl font-bold text-base shadow-lg`}>
          {categoryInfo.icon} {categoryInfo.label}
        </div>
        
        {/* Signature Badge */}
        {item.isSignature && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-2 rounded-xl font-bold text-base shadow-lg">
            ⭐ SIGNATURE
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 px-3 py-2 rounded-xl border-2 border-gray-200">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
            <span className="font-bold text-gray-800 text-lg">{item.rating}/5</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          {item.description}
        </p>

        {/* Price */}
        <div className="bg-white rounded-xl p-4 mb-6 border-3 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-green-600">{item.price}</span>
              {item.servingSize && (
                <span className="text-lg text-gray-600 ml-2">({item.servingSize})</span>
              )}
            </div>
            {item.cookingTime && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-6 h-6 mr-2" />
                <span className="text-lg font-medium">{item.cookingTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-green-600" />
            🥘 Bahan Utama:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {item.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center text-lg text-gray-700">
                <span className="text-green-600 mr-2 text-xl">•</span>
                <span className="font-medium">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        {item.benefits && item.benefits.length > 0 && (
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-600" />
              💪 Manfaat:
            </h4>
            <div className="space-y-2">
              {item.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-lg text-gray-700">
                  <span className="text-red-600 mr-2 text-xl">♥</span>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Contact */}
        <div className="bg-white rounded-xl p-4 border-3 border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 mb-3">📍 Informasi Lokasi:</h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-gray-800">Lokasi:</p>
                <p className="text-lg text-gray-700">{item.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-gray-800">Kontak:</p>
                <p className="text-lg text-gray-700 font-mono">{item.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}