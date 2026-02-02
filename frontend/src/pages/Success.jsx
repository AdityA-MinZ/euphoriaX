import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Ticket } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">No booking information found</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your tickets have been booked successfully</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Booking ID</p>
            <p className="font-mono text-lg">{booking._id}</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Ticket Type</span>
                <span className="font-medium">{booking.ticketType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Number of Tickets</span>
                <span className="font-medium">{booking.numberOfTickets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount</span>
                <span className="font-medium text-purple-400">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  {booking.bookingStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-gray-400 mb-4">
              A confirmation email has been sent to {booking.contact.email}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/my-bookings"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium text-center transition"
            >
              View My Bookings
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium text-center hover:shadow-lg hover:shadow-purple-500/50 transition"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
