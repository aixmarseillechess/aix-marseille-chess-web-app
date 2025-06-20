# Aix-Marseille Chess Club Website

The official chess club website for Aix-Marseille University. A modern blog platform where authenticated users can share chess strategies, tournament updates, and community news.

## Features

- **Modern React App** - Built with Vite for fast development and optimized builds
- **Dark Navy Blue Theme** - Beautiful, professional design
- **User Authentication** - Secure login/register system for university students
- **Blog System** - Create, read, and interact with posts
- **Image Upload** - Cloudinary integration for image storage
- **Responsive Design** - Works perfectly on all devices
- **Admin Panel** - Manage users and content

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Icon library
- **Date-fns** - Date formatting utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aix-marseille-chess
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp server/env.example server/.env
   ```
   
   Edit `server/.env` with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and the Vite dev server (port 3000).

## Available Scripts

- `npm run dev` - Start both server and client in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the Vite dev server
- `npm run build` - Build the client for production
- `npm start` - Start the production server

## Project Structure

```
aix-marseille-chess/
├── client/                 # Vite React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
└── package.json            # Root package.json
```

## Authentication

The app uses JWT-based authentication. Users must have an email ending in `@etu.univ-amu.fr` to register. The system includes:

- User registration and login
- Password hashing with bcrypt
- JWT token management
- Protected routes
- Admin role system

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (author only)
- `DELETE /api/posts/:id` - Delete post (author only)
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

## Development

### Frontend Development
The frontend uses Vite for fast development:
- Hot module replacement
- Fast refresh
- Optimized builds
- Proxy configuration for API calls

### Backend Development
The backend uses nodemon for automatic restarts during development.

## Deployment

### Frontend
Build the client for production:
```bash
npm run build
```

### Backend
The server can be deployed to any Node.js hosting platform (Heroku, Vercel, Railway, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email: chess@univ-amu.fr 