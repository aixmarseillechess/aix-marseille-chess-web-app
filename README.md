# 🏆 Aix-Marseille Chess Club Website

A modern, bilingual chess club website for Aix-Marseille University built with the MERN stack (MongoDB, Express.js, React, Node.js) and featuring Cloudinary for image storage.

## 🌟 Features

### 🎯 Core Functionality
- **User Authentication & Authorization**
  - Secure registration with university email validation
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Profile management with ELO rating system

- **Content Management**
  - Create, edit, and delete posts with rich text content
  - Multi-image upload support via Cloudinary
  - Post categorization and search functionality
  - View tracking and comment system

- **Community Features**
  - Public user profiles with chess statistics
  - Interactive commenting system
  - Post sharing and engagement metrics
  - Responsive design for all devices

### 🌍 Internationalization
- **Bilingual Support**: English and French
- **Dynamic Language Switching**: Real-time language changes
- **Localized Content**: All text, dates, and formats adapt to selected language
- **Persistent Language Preference**: Remembers user's language choice

### 📚 Educational Resources
- **Chess Rules & Fundamentals**: Complete guide with interactive sections
- **Tournament Information**: Schedule, locations, and event details
- **Training Materials**: Downloadable PDFs and video tutorials
- **Chess Literature**: Curated collection of classic and modern chess books

### 🎨 Modern UI/UX
- **Dark Theme**: Navy blue color scheme with excellent contrast
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **React Context** for state management
- **react-i18next** for internationalization
- **React Icons** for consistent iconography
- **CSS3** with custom properties for theming

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file upload handling
- **Cloudinary** for cloud image storage
- **CORS** enabled for cross-origin requests

### Development Tools
- **ESLint** for code quality
- **Vite** for fast build and development
- **Hot reload** for development efficiency

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd aix-marseille-chess
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd client
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

#### Development Mode
```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm run dev
```

#### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start production server
cd server
npm start
```

## 🚀 Usage

### For Users
1. **Registration**: Create an account with your university email
2. **Browse Posts**: Explore chess strategies, tournament updates, and community content
3. **Create Content**: Share your chess insights and experiences
4. **Engage**: Comment on posts and interact with the community
5. **Learn**: Access educational resources and training materials
6. **Switch Language**: Use the language switcher in the navigation bar

### For Administrators
1. **User Management**: Monitor and manage user accounts
2. **Content Moderation**: Review and moderate posts and comments
3. **Analytics**: View engagement metrics and user statistics
4. **Resource Management**: Update tournament schedules and training materials

## 📁 Project Structure

```
aix-marseille-chess/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── pages/         # Page components
│   │   ├── locales/       # Translation files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── package.json
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 🎨 Customization

### Theme Colors
The application uses CSS custom properties for easy theming. Main colors are defined in `client/src/App.css`:
```css
:root {
  --primary-color: #0f172a;    /* Dark navy blue */
  --secondary-color: #1e293b;  /* Lighter navy */
  --accent-color: #3b82f6;     /* Blue accent */
  --text-primary: #f8fafc;     /* Primary text */
  --text-secondary: #cbd5e1;   /* Secondary text */
}
```

### Adding New Languages
1. Create new translation files in `client/src/locales/[language]/translation.json`
2. Update `client/src/i18n.js` to include the new language
3. Add language options to the language switcher component

## 🚀 Deployment

### Render Deployment
The project includes a `render.yaml` file for easy deployment on Render:

1. Connect your GitHub repository to Render
2. Render will automatically detect the configuration
3. Set environment variables in Render dashboard
4. Deploy with one click

### Manual Deployment
```bash
# Build the application
cd client && npm run build
cd ../server && npm install

# Deploy to your preferred hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React, Vite, CSS3
- **Backend Development**: Node.js, Express, MongoDB
- **Design**: Modern, responsive UI/UX
- **Internationalization**: Bilingual support (EN/FR)

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Built with ❤️ for the Aix-Marseille University Chess Club** 