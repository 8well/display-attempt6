import React from 'react'
import { Twitter, Facebook, Instagram, Globe } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.svg" 
                alt="DisplayTokens Logo" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://via.placeholder.com/32';
                }}
              />
              <h3 className="text-xl font-bold">DisplayTokens</h3>
            </div>
            <p className="text-gray-400">Your AI-powered crypto companion</p>
          </div>
          {/* Rest of the footer content remains unchanged */}
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 DisplayTokens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer