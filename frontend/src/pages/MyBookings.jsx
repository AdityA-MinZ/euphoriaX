import { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { bookingAPI } from '../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await bookingAPI.getMyBookings();
      setBookings(data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-4">No bookings yet</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{booking.event.name}</h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-purple-400" />
                        <span>{booking.event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-purple-400" />
                        <span>{formatDate(booking.event.date)} at {booking.event.time}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.bookingStatus === 'confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Ticket Type</p>
                    <p className="font-medium">{booking.ticketType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Tickets</p>
                    <p className="font-medium">{booking.numberOfTickets}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Amount</p>
                    <p className="font-medium text-purple-400">₹{booking.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Booked On</p>
                    <p className="font-medium">{formatDate(booking.bookingDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
