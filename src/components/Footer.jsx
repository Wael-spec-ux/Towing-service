import React from "react";
import { Link } from "react-router";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Truck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Emergency Towing",
    "Long Distance Transport",
    "Roadside Assistance",
    "Vehicle Recovery",
    "Motorcycle Towing",
    "Accident Recovery"
  ];

  const quickLinks = [
    "Home",
    "Services",
    "Pricing",
    "Tracking",
    "About Us",
    "Contact"
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                <h2 className="text-2xl font-black tracking-tighter">
                  <span className="text-white">Top </span>
                  <span className="text-gray-200">Depannage</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for emergency vehicle assistance nationwide. 
              Fast, safe, and reliable towing services 24/7.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-2 transition-all duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group cursor-pointer">
                    <Truck className="w-4 h-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold">Emergency Line</p>
                  <p className="text-gray-400">1-800-SOS-CARS</p>
                  <p className="text-sm text-gray-500">24/7 Available</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-400">TopDepannage@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold">Headquarters</p>
                  <p className="text-gray-400">123 Emergency Street</p>
                  <p className="text-gray-400">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-gray-900/20 rounded-2xl border border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">Insured Service</h4>
                <p className="text-sm text-gray-400">Fully insured</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">24/7 Service</h4>
                <p className="text-sm text-gray-400">Always available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Truck className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">Fast Response</h4>
                <p className="text-sm text-gray-400">Under 30 mins</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">Nationwide</h4>
                <p className="text-sm text-gray-400">50+ cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} TopDepannage. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
              <div className="flex items-center text-blue-400">
                <Shield className="w-4 h-4 mr-2" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;