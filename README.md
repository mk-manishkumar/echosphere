# 🌐 Echosphere - Real-Time Chat Application

A modern, full-stack real-time messaging application built with **React**, **Node.js**, **Socket.io**, and **MongoDB**. Features infinite scroll pagination, responsive mobile-first design, and real-time bidirectional communication.

---

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 💬 **Real-Time Messaging** - Instant bidirectional communication via WebSocket (Socket.io)
- 👥 **User Directory** - Searchable list of all active users with online status
- ♾️ **Infinite Scroll** - Pagination for both users and messages for optimal performance
- 🔔 **Online Status** - Real-time user availability indicators
- 🎯 **User Profiles** - Profile creation with avatar generation and customization

### UI/UX
- 📱 **Fully Responsive Design** - Mobile, tablet, and desktop optimized
- 🎨 **Dark Theme** - Modern dark mode interface with Tailwind CSS
- ⚡ **Performance Optimized** - Lazy loading, infinite scroll, efficient re-renders
- 🔄 **Real-Time Sync** - Instant UI updates across all connected clients
- 📱 **WhatsApp-Style Layout** - Mobile shows chat list, taps open chat (with back button)

### Backend Features
- 🛡️ **Secure Authentication** - Password hashing with bcryptjs, JWT tokens
- 🗄️ **MongoDB Integration** - NoSQL database for scalable data storage
- 🔌 **Socket.io Real-Time** - Full-duplex communication channels
- ⏰ **Inactivity Cleanup** - Automatic cleanup of inactive user sessions via cron jobs
- 🚀 **Production Ready** - Error handling, middleware, async utilities

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Redux Toolkit** | State management |
| **Tailwind CSS** | Styling |
| **Vite** | Build tool & dev server |
| **Socket.io Client** | Real-time communication |
| **Axios** | HTTP requests |
| **React Router** | Navigation |
| **React Hot Toast** | Notifications |
| **React Infinite Scroll** | Pagination component |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Express.js** | Web framework |
| **Node.js** | Runtime environment |
| **MongoDB** | NoSQL database |
| **Socket.io** | Real-time communication |
| **JWT** | Authentication tokens |
| **Bcryptjs** | Password hashing |
| **Mongoose** | MongoDB ODM (optional) |
| **Node-cron** | Scheduled tasks |
| **Nodemon** | Dev server auto-reload |

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **MongoDB** v5.0+ (local or cloud - Atlas)
- **Git** for version control

Verify installations:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/mk-manishkumar/echosphere.git
cd echosphere
```

### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.sample .env

# Configure environment variables (see Environment Variables section)
# Edit .env with your database URL, JWT secret, etc.

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### 3. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file (if needed for API URL)
cp .env.sample .env

# Start development server
npm run dev

# App runs on http://localhost:5173
```

Both servers should now be running. Open http://localhost:5173 in your browser.

---

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/echosphere
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/echosphere

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRES=7d
COOKIE_EXPIRES=7

# CORS
CORS_ORIGIN=http://localhost:5173

# Socket.io
SOCKET_CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
echosphere/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   │   └── utilities/
│   │   │       └── axiosInstance.js # API client
│   │   ├── pages/
│   │   │   ├── authentication/      # Login, Signup
│   │   │   ├── home/                # Main chat interface
│   │   │   │   ├── Home.jsx         # Main layout
│   │   │   │   ├── UserSidebar.jsx  # Users list
│   │   │   │   ├── MessageContainer.jsx
│   │   │   │   ├── SendMessage.jsx
│   │   │   │   └── User.jsx
│   │   │   └── profile/             # User profile
│   │   ├── store/                   # Redux store
│   │   │   ├── store.js             # Store configuration
│   │   │   ├── socketMiddleware.js  # Socket.io integration
│   │   │   └── slice/               # Redux slices
│   │   │       ├── user/
│   │   │       ├── message/
│   │   │       └── socket/
│   │   ├── App.jsx                  # Main app component
│   │   ├── router.jsx               # Route configuration
│   │   └── main.jsx                 # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Express Backend
│   ├── controllers/                 # Business logic
│   │   ├── user.controller.js       # User operations
│   │   └── message.controller.js    # Message operations
│   ├── models/                      # MongoDB models
│   │   ├── User.model.js
│   │   ├── Message.model.js
│   │   └── Conversation.model.js
│   ├── routes/                      # API routes
│   │   ├── user.route.js
│   │   └── message.route.js
│   ├── middlewares/                 # Express middlewares
│   │   ├── auth.middleware.js       # JWT verification
│   │   └── error.middleware.js      # Error handling
│   ├── socket/                      # Socket.io handlers
│   │   └── socket.js
│   ├── cron/                        # Scheduled tasks
│   │   └── inactivityCleanup.cron.js
│   ├── utils/                       # Utility functions
│   │   ├── asyncHandler.utility.js
│   │   └── errorHandler.utility.js
│   ├── db/
│   │   └── connection1.db.js        # MongoDB connection
│   ├── server.js                    # Entry point
│   └── package.json
│
├── RESPONSIVE_LAYOUT.md             # Responsive design documentation
└── README.md                        # This file
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Create new account |
| POST | `/user/login` | Login to account |
| POST | `/user/logout` | Logout from account |
| GET | `/user/get-profile` | Get current user profile |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/get-other-users?skip=0&limit=10` | Get users list (paginated) |
| GET | `/user/check-username?username=test` | Check username availability |
| PUT | `/user/update-profile` | Update user profile |
| PUT | `/user/change-password` | Change password |
| DELETE | `/user/account` | Delete account |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/message/get-messages/:receiverId?skip=0&limit=20` | Get conversation messages (paginated) |
| POST | `/message/send/:receiverId` | Send message |

---

## 🔗 Socket.io Events

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `connect` | - | User connects to socket |
| `user-online` | `{ userId }` | Notify user is online |
| `disconnect` | - | User disconnects |

### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `onlineUsers` | `[userId, ...]` | List of online users |
| `newMessage` | `{ message object }` | New incoming message |
| `userOnline` | `{ userId }` | User came online |
| `userOffline` | `{ userId }` | User went offline |

---

## 🎯 Key Features Explained

### Infinite Scroll Pagination
Both users and messages use infinite scroll for performance:

**Users List:**
- Loads 10 users initially
- Fetches next 10 when scrolled to bottom
- Prevents loading during search

**Messages:**
- Loads 20 most recent messages
- Loads older messages when scrolled to top
- Shows "Beginning of conversation" when all loaded

### Responsive Design
- **Desktop (≥768px)**: Split layout with sidebar + chat
- **Tablet/Mobile (<768px)**: Full-screen chat with back button
- Smooth transitions between layouts

### Real-Time Features
- Socket.io maintains persistent connection
- Bi-directional communication for instant updates
- Online/offline status tracking
- Real-time message delivery

---


## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  username: String (unique),
  password: String (hashed),
  email: String,
  gender: String ("male" | "female"),
  avatar: String (URL),
  last_login_at: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversation Model
```javascript
{
  _id: ObjectId,
  participants: [ObjectId, ObjectId] (ref: User),
  messages: [ObjectId] (ref: Message),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify credentials for MongoDB Atlas

### "Port already in use"
- Change port in `.env` or use: `PORT=3001 npm run dev`
- Kill existing process: `lsof -i :5000` then `kill -9 <PID>`

### "Socket.io connection failed"
- Verify backend is running
- Check CORS settings match frontend URL
- Clear browser cache and restart

### "Duplicate users after navigation"
- Already fixed! Redux state resets on route change
- See user.slice.js `resetUsers` action

### Messages not loading
- Check infinite scroll implementation
- Verify MongoDB has messages
- Check browser console for errors

---

## 📈 Performance Optimization

- ✅ Infinite scroll prevents loading entire lists
- ✅ Lazy loading components with React.lazy
- ✅ Redux for state management efficiency
- ✅ Memoization for expensive computations
- ✅ Image optimization via avatar generation
- ✅ CSS optimization with Tailwind purge

---

## 🔐 Security Features

- ✅ JWT authentication with HttpOnly cookies
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ CORS protection
- ✅ Input validation on frontend & backend
- ✅ Protected routes with authentication
- ✅ Error messages don't leak sensitive info

---

## 🧪 Testing

### Run ESLint
```bash
cd client
npm run lint
```

### Manual Testing Checklist
- [ ] Register new account
- [ ] Login with credentials
- [ ] Search for users
- [ ] Send message to user
- [ ] Receive message in real-time
- [ ] Check online/offline status
- [ ] Edit profile
- [ ] Responsive on mobile
- [ ] Logout

---

## 📝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the **The Unlicense** - see LICENSE file for details.

---

## 👨‍💻 Author

**Manish Kumar**
- GitHub: [@mk-manishkumar](https://github.com/mk-manishkumar)
- Repository: [echosphere](https://github.com/mk-manishkumar/echosphere)

---

## 🙏 Acknowledgments

- Socket.io for real-time communication
- Tailwind CSS for styling framework
- Redux Toolkit for state management
- React for UI library
- MongoDB for database

---

## 📞 Support

For issues, questions, or suggestions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review [RESPONSIVE_LAYOUT.md](./RESPONSIVE_LAYOUT.md)
3. Open an issue on GitHub
4. Contact: [GitHub Issues](https://github.com/mk-manishkumar/echosphere/issues)

---

## 🎯 Roadmap

**Future Features:**
- [ ] Group chats
- [ ] File/image sharing
- [ ] Message encryption (E2E)
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message search
- [ ] Voice/video calls
- [ ] User blocking
- [ ] Message reactions

---

**Last Updated:** April 2026  
**Version:** 1.0.0

⭐ If you like this project, please give it a star on GitHub!
