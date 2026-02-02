# EuphoriaX - Event Ticketing Platform

Premium event ticketing platform for club nights, concerts, and exclusive parties.

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Bcrypt
- Razorpay (payment integration ready)

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend dev server:
```bash
npm run dev
```

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables
6. Deploy

## 📝 Features

- ✅ User authentication (Register/Login)
- ✅ Event browsing with filters
- ✅ Event details page
- ✅ Ticket booking system
- ✅ User booking history
- ✅ Responsive design
- ⏳ Razorpay payment integration (add your keys)
- ⏳ Google OAuth (optional)

## 👨‍💻 Author

Your Name - EuphoriaX Team
