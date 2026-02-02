import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Minus, Plus, X } from 'lucide-react';
import { eventAPI, bookingAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [ticketType, setTicketType] = useState('stagFemale');
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [attendees, setAttendees] = useState([
    { name: '', aadhar: '', gender: 'Male', profession: '', residency: '' },
  ]);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data } = await eventAPI.getEvent(id);
      setEvent(data.event);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/event/${id}` } });
      return;
    }
    setShowBookingModal(true);
  };

  const handleTicketChange = (increment) => {
    const maxTickets = ticketType === 'couple' ? 2 : 2;
    setNumberOfTickets((prev) => {
      const newValue = prev + increment;
      if (newValue < 1) return 1;
      if (newValue > maxTickets) return maxTickets;
      return newValue;
    });

    if (increment > 0) {
      setAttendees([...attendees, { name: '', aadhar: '', gender: 'Male', profession: '', residency: '' }]);
    } else if (attendees.length > 1) {
      setAttendees(attendees.slice(0, -1));
    }
  };

  const updateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const calculateTotal = () => {
    if (!event) return 0;
    const prices = {
      stagFemale: event.pricing.stagFemale,
      stagMale: event.pricing.stagMale,
      couple: event.pricing.couple,
    };
    return prices[ticketType] * numberOfTickets;
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        eventId: event._id,
        ticketType: ticketType === 'stagFemale' ? 'Stag Female' : ticketType === 'stagMale' ? 'Stag Male' : 'Couple Entry',
        numberOfTickets,
        totalAmount: calculateTotal(),
        contact: { phone: contactPhone, email: contactEmail },
        attendees,
      };

      const { data } = await bookingAPI.createBooking(bookingData);
      navigate('/success', { state: { booking: data.booking } });
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Event not found</p>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      weekday: 'short',
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-96 bg-gradient-to-br from-purple-900/40 to-pink-900/40">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl">🎧</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                  <h1 className="text-4xl font-bold mt-4">{event.name}</h1>
                </div>
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">
                  {event.totalTickets - event.bookedTickets} tickets left
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={20} className="text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm">{event.city}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar size={20} className="text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock size={20} className="text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">About Event</h3>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Book Tickets</h3>

              <div className="space-y-4 mb-6">
                {[
                  { key: 'stagFemale', label: 'Stag Female', price: event.pricing.stagFemale },
                  { key: 'stagMale', label: 'Stag Male', price: event.pricing.stagMale },
                  { key: 'couple', label: 'Couple Entry', price: event.pricing.couple },
                ].map((ticket) => (
                  <div
                    key={ticket.key}
                    onClick={() => setTicketType(ticket.key)}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:border-purple-500/50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={ticketType === ticket.key}
                          onChange={() => setTicketType(ticket.key)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium">{ticket.label}</p>
                          <p className="text-xs text-gray-400">{ticket.key === 'couple' ? '2 people' : 'Per person'}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-purple-400">₹{ticket.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleTicketChange(-1)}
                    className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{numberOfTickets}</span>
                  <button
                    onClick={() => handleTicketChange(1)}
                    className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-purple-400">₹{calculateTotal()}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Complete Booking</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="Phone Number"
                  />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="Email"
                  />
                </div>
              </div>

              {attendees.map((attendee, index) => (
                <div key={index} className="border border-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-4">Attendee {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={attendee.name}
                      onChange={(e) => updateAttendee(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      required
                      maxLength="12"
                      value={attendee.aadhar}
                      onChange={(e) => updateAttendee(index, 'aadhar', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                      placeholder="Aadhar Number"
                    />
                    <select
                      required
                      value={attendee.gender}
                      onChange={(e) => updateAttendee(index, 'gender', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      required
                      value={attendee.profession}
                      onChange={(e) => updateAttendee(index, 'profession', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                      placeholder="Profession"
                    />
                    <input
                      type="text"
                      required
                      value={attendee.residency}
                      onChange={(e) => updateAttendee(index, 'residency', e.target.value)}
                      className="w-full md:col-span-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                      placeholder="Residency Address"
                    />
                  </div>
                </div>
              ))}

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center text-2xl font-bold mb-4">
                  <span>Total Amount</span>
                  <span className="text-purple-400">₹{calculateTotal()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
