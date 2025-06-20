# Registration System Guide

## Overview
The registration system has been implemented with the following features:

### Backend (Server)
- **Route**: `POST /api/auth/register`
- **Validation**: University email restriction (@etu.univ-amu.fr only)
- **Password hashing**: Automatic bcrypt hashing
- **JWT token**: Automatic token generation after registration
- **Error handling**: Comprehensive validation and error messages

### Frontend (Client)
- **Page**: `/register` route
- **Form validation**: Real-time client-side validation
- **University email requirement**: Only accepts @etu.univ-amu.fr emails
- **Auto-login**: Automatically logs in user after successful registration
- **Responsive design**: Works on mobile and desktop

## Features

### Email Validation
- Only Aix-Marseille University student emails are allowed
- Format: `your.name@etu.univ-amu.fr`
- Both frontend and backend validation

### Form Fields
- **First Name** (required)
- **Last Name** (required)
- **Username** (required, unique, 3-30 characters)
- **University Email** (required, @etu.univ-amu.fr only)
- **Password** (required, minimum 6 characters)
- **Confirm Password** (required, must match)

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Input sanitization
- CSRF protection via CORS
- Rate limiting ready

## Usage

### For Users
1. Navigate to `/register`
2. Fill out the form with your university email
3. Submit and get automatically logged in
4. Redirected to home page

### For Developers
1. Ensure MongoDB is running
2. Set up environment variables (see setup-env.sh)
3. Start server: `npm run dev` (in server directory)
4. Start client: `npm run dev` (in client directory)

## API Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "chessplayer",
  "email": "student.name@etu.univ-amu.fr",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "chessplayer",
    "email": "student.name@etu.univ-amu.fr",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "chessRating": 1200
  },
  "token": "jwt_token_here"
}
```

## Error Handling

### Common Errors
- **Email already registered**: User with this email exists
- **Username already taken**: Username is not unique
- **Invalid email format**: Must be @etu.univ-amu.fr
- **Password too short**: Minimum 6 characters
- **Passwords don't match**: Confirmation doesn't match

### Error Response Format
```json
{
  "message": "Error description here"
}
```

## Styling
- Dark navy blue theme
- Glassmorphism design
- Responsive layout
- Smooth animations
- Error state styling

## Next Steps
- Add email verification (optional)
- Implement password strength requirements
- Add CAPTCHA for spam prevention
- Create admin user management 