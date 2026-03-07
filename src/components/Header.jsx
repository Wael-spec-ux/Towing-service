import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, Phone, MapPin, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      {/* Top Bar */}
      <div className="hidden md:block bg-gradient-to-r from-blue-900/30 to-gray-900">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-blue-400">
                <Phone className="w-4 h-4 mr-2" />
                <span>Emergency Line: 97 354 009</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Serving Nationwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                  <h1 className="text-2xl font-black tracking-tighter">
                    <span className="text-white">Top </span>
                    <span className="text-gray-200">Depannage</span>
                  </h1>
                </div>
              </div>
              <span className="hidden md:block text-sm text-gray-400 font-medium">
                Emergency Vehicle Assistance
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
                )}
              </Link>
            ))}
            {location.pathname === '/AdminDashboard' && (
  <button
    onClick={() => navigate("/")}
    className="ml-4 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20"
  >
    Log out
  </button>
) || (  <button
    onClick={() => navigate("/reserve")}
    className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
  >
    Book Now
  </button>)}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-700">
            <div className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-blue-900/30 text-blue-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;