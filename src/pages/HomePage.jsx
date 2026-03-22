import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { verifyTokenExistInLocalStorage } from "../components/VerifTokenExist";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    verifyTokenExistInLocalStorage();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-0 flex flex-col md:flex-row items-center justify-between min-h-screen">
        
        {/* LEFT SIDE - CONTENT */}
        <div className="flex-1 max-w-2xl py-12 md:py-0">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Trusted Nationwide Service
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white">
            When Your Car Needs
            <span className="block">
              <span className="text-blue-400">Emergency </span>
              <span className="text-white">Help</span>
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            Top Depannage provides rapid response vehicle towing and transport services 
            across the country. Our professional team ensures your vehicle's safety 
            with 24/7 availability and real-time tracking.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">24/7 Service</h3>
                <p className="text-sm text-gray-400">Always available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Nationwide</h3>
                <p className="text-sm text-gray-400">Coverage everywhere</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/reserve")}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center"
            >
              Book Now
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Our Services
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-12 pt-8 border-t border-gray-800">
            <div>
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-sm text-gray-400">Vehicles Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Cities</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGO/VISUAL */}
        <div className="flex-1 flex justify-center items-center relative mb-60">
          {/* Background Effects */}
          <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-2xl"></div>
          
          {/* Logo Container */}
          <div className="relative z-10 text-center transform hover:scale-105 transition-transform duration-500">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  TOP
                </span>
                <span className="text-white">Help</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-4"></div>
            </div>
            
            {/* Tagline with Animation */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 text-lg">
                <span className="text-blue-400 animate-pulse">●</span>
                <span className="text-white font-medium tracking-wider">FAST RESPONSE</span>
                <span className="text-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                <span className="text-white font-medium tracking-wider">SAFE TRANSPORT</span>
                <span className="text-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
              </div>
              
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Your trusted partner for emergency vehicle assistance nationwide
              </p>
              
              {/* Decorative Elements */}
              <div className="flex justify-center space-x-2 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;