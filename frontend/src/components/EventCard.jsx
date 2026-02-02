import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'DJ Night': '🎧',
      'Live Gig': '🎸',
      'Pool Party': '🏊',
      'Club Night': '🍸',
    };
    return icons[category] || '🎉';
  };

  return (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 group-hover:opacity-75 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl">{getCategoryIcon(event.category)}</span>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold">
            {event.category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-semibold">
            {event.totalTickets - event.bookedTickets} left
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold group-hover:text-purple-400 transition">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-purple-400" />
            <span>{event.venue}, {event.city}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-purple-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-purple-400" />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Starting from</span>
            <span className="text-2xl font-bold text-purple-400">
              ₹{Math.min(event.pricing.stagFemale, event.pricing.stagMale, event.pricing.couple)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
