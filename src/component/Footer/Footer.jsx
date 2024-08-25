import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Footer = () => {
  const position = [16.047079, 108.206230]; 

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 lg:px-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/services" className="hover:text-gray-400">Our Services</a>
          <a href="/portfolio" className="hover:text-gray-400">Portfolio</a>
          <a href="/blog" className="hover:text-gray-400">Blog</a>
          <a href="/company" className="hover:text-gray-400">Our Company</a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="mt-6 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <p className="text-center md:text-left text-gray-400">05 Vo Quy Huan, FPT High Tech Park, Da Nang, Viet Nam</p>
            <p className="text-center md:text-left text-gray-400">Phone: +84.876666634</p>
          </div>
          <div className="w-full md:w-1/2">
            <MapContainer className="h-64 w-full" center={position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Our office is located here.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} DanangExpert. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
