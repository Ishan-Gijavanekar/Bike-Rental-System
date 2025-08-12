
# 🚴‍♂️ Bike Rental System

A full-featured MERN stack application for renting bikes, complete with an admin panel, Stripe payment integration, JWT authentication, and review system.

---

## 📦 Tech Stack

- **Frontend**: React, Context API, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Payments**: Stripe

---

## 🗂️ Frontend Structure

```
frontend/
├── components/
│   ├── ConfirmDialog.jsx
│   ├── Dashboard.jsx
│   ├── EditBookingModal.jsx
│   ├── EditReviewModal.jsx
│   ├── EditRoleModal.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ReviewsPanel.jsx
│   ├── UserDetails.jsx
│   ├── UserPanel.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── AddBike.jsx
│   ├── AllBikes.jsx
│   ├── BookDetails.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MyBooking.jsx
│   ├── MyReviews.jsx
│   ├── PaymentPage.jsx
│   ├── PrivacyPolicy.jsx
│   ├── Register.jsx
│   ├── TermsAndCondition.jsx
├── services/
│   └── api.js
```

---

## 🔐 Auth Context Setup

```js
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/users/profile');
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## 🧠 Backend Models

Models include: `User`, `Bike`, `Booking`, `Payment`, `Review`. All use Mongoose schemas with timestamps and references.

> ✅ Includes validation, enum constraints, and relational references.

---

## 🚀 API Routes

### 🔧 Bike Routes
- `GET /get-all-bikes`
- `GET /get-bike-by-id/:id`
- `POST /add-bike` *(secured, image upload)*
- `PUT /update-bike/:id` *(secured, image upload)*
- `DELETE /delete-bike/:id` *(secured)*

### 📅 Booking Routes
- `GET /get-all-bookings` *(admin only)*
- `GET /get-my-bookings`
- `GET /get-booking-by-id/:id`
- `POST /new-booking`
- `PUT /update-booking/:id`
- `DELETE /delete-booking/:id`

### 💳 Payment Routes
- `POST /create-payment`
- `POST /confirm-payment`

### ⭐ Review Routes
- `POST /post-review`
- `PUT /update-my-review/:id`
- `GET /get-my-reviews`
- `GET /get-review-of-bike/:id`
- `GET /get-all-reviews`
- `DELETE /delete-review/:id`

### 👤 User Routes
- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /profile`
- `PUT /update-user`
- `GET /get-all-users`
- `GET /get-user-by-id/:id`
- `PUT /update-role/:id`
- `DELETE /delete-user/:id`

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ishan-Gijavanekar/bike-rental-system.git
cd bike-rental-system
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Variables

Create `.env` files in both `backend/` and `frontend/` with appropriate keys:

#### 📁 backend/.env

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### 📁 frontend/.env

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📦 Sample package.json

### 📁 backend/package.json

```json
{
  "name": "bike-rental-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.3.1",
    "multer": "^1.4.5",
    "stripe": "^12.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### 📁 frontend/package.json

```json
{
  "name": "bike-rental-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

---

## 📄 .gitignore

### 📁 backend/.gitignore

```
node_modules/
.env
```

### 📁 frontend/.gitignore

```
node_modules/
.env
build/
```

---

## ✅ Features

- 🛵 Bike listing, booking, and availability
- 🧾 Admin dashboard with user and booking management
- 💳 Stripe payment integration
- ⭐ Review system with rating and comments
- 🔐 JWT-based authentication and protected routes
- 📜 Privacy Policy and Terms & Conditions pages

---

## 📌 Notes

- All routes are protected using JWT middleware (`securedRoute`)
- Image uploads handled via `multer`
- Stripe integration includes `create-payment` and `confirm-payment` endpoints
- Admin role can manage users, bookings, and bikes

---

## 📄 License

This project is licensed under the MIT License.
```

Let me know if you'd like me to generate a `server.js`, `api.js`, or sample React page to complete the setup.
