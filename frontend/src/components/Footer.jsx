import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">E</span>
              </div>
              <span className="text-xl font-bold">EuphoriaX</span>
            </div>
            <p className="text-sm text-gray-400">
              Discover the hottest events in your city. Book premium club nights, concerts, and exclusive parties.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Events</Link></li>
              <li><Link to="/my-bookings" className="hover:text-white transition">My Bookings</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Cities</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Bengaluru</a></li>
              <li><a href="#" className="hover:text-white transition">Delhi</a></li>
              <li><a href="#" className="hover:text-white transition">Mumbai (Coming Soon)</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-500/20 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-500/20 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-500/20 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-500/20 transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; 2026 EuphoriaX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
