import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventAPI } from '../utils/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [selectedCity, selectedCategory]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCity) params.city = selectedCity;
      if (selectedCategory) params.category = selectedCategory;

      const { data } = await eventAPI.getAllEvents(params);
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Euphoria
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the hottest club nights, live performances, and exclusive events. Book your tickets in seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {['🎧 DJ Night', '🎸 Live Gig', '🏊 Pool Party', '🍸 Club Night'].map((cat) => (
                <button
                  key={cat}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition backdrop-blur-sm border border-white/10"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition"
          >
            <option value="">All Cities</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition"
          >
            <option value="">All Categories</option>
            <option value="DJ Night">DJ Night</option>
            <option value="Live Gig">Live Gig</option>
            <option value="Pool Party">Pool Party</option>
            <option value="Club Night">Club Night</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No events found</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
