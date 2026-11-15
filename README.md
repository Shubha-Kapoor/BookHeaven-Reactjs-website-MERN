Here is your complete, fully polished, professional **`README.md`** file for your repository. It includes all your final MERN stack architectural details, authentication security layers, role-based access control (RBAC), theme systems, and database workflows!

---

```markdown
# 📚 BookHeaven — Your Digital Bookshelf, Organized

> **A Full-Stack MERN Digital Library & Book Access Management System**

BookHeaven is a modern, aesthetically designed digital library platform that allows users to explore, search, filter, manage, and access books through an interactive web interface. 

Built as a complete **MERN Stack application**, BookHeaven features a secure RESTful backend, JWT-based authentication with robust client and server-side validation, role-based access control (RBAC), and persistent cloud-hosted MongoDB Atlas storage.

---

## 🌟 Overview

BookHeaven bridges creative, customizable UI design with robust backend management. 

The application features role-segregated navigation, allowing regular readers to browse collections, view detailed synopses, and check subscriber-exclusive books, while administrators have secure, token-authenticated access to manage and expand the digital library.

### Application Flow

```text
                    ┌───────────────────┐
                    │  React Frontend   │
                    │   BookHeaven UI   │
                    └─────────┬─────────┘
                              │
                      HTTP / REST API (Axios)
                              │
                              ▼
                    ┌───────────────────┐
                    │ Express.js Server │
                    │   Node.js API     │
                    └─────────┬─────────┘
                              │
                      Mongoose ODM
                              │
                              ▼
                    ┌───────────────────┐
                    │   MongoDB Atlas   │
                    │ bookheaven Database │
                    └───────────────────┘

```

---

# ✨ Core Features

## 🔐 Secure Authentication & Role-Based Access Control (RBAC)

* **JWT & Bcrypt Security:** Secure user registration and login utilizing JSON Web Tokens and salted password hashing (`bcryptjs`).
* **Input Validation & Sanitization:** Custom frontend regex email validation and password length checks (minimum 6 characters) paired with backend API safety guardrails to ensure data integrity.
* **Admin vs. Reader Segregation:** Role-based permissions restrict administrative actions (such as adding new books) exclusively to verified admin accounts (`isAdmin: true`).
* **Dynamic Navigation:** The UI adapts instantly based on user roles and login states, displaying profile views, custom badge indicators, and management controls accordingly.

## 📚 Book & Catalog Management

* **Persistent Database Storage:** All books, categories, and user profiles are securely stored and fetched from MongoDB Atlas (`bookheaven` cluster).
* **Premium Book Badges:** Support for subscriber-exclusive titles highlighted with dynamic **✨ Premium** badges across catalog views.
* **Detailed Book Information:** Interactive views displaying title, author, category, rating, publication year, synopsis, and direct reader access links.

## 🔍 Real-Time Search & Category Filtering

* Users can search dynamically through the book collection using titles or author names.
* Category filtering enables quick exploration across genres like Fiction, Sci-Fi, Fantasy, Biography, and Tech.

## 🎨 Dynamic Theme System

BookHeaven includes multiple visual themes powered by CSS custom properties, letting users instantly shift the app's aesthetic vibe:

* 🍵 Matcha Latte
* 🔹 Cyan Blue
* 🔮 Lavender Milk
* 🧋 Taro Boba
* ⚫ Black Pebble
* 🧋 Classic Milk Tea

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
| --- | --- |
| React 18 | Building reusable user interfaces |
| Vite 5 | Fast frontend building and dev |
| JavaScript ES6+ | Application logic & state management |
| CSS3 | Styling and responsive design |
| CSS Variables | Dynamic multi-theme architecture |
| Axios | HTTP client for REST API requests |

---

## Backend

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime environment |
| Express.js | REST API routing & middleware |
| Mongoose | MongoDB object modeling |
| bcryptjs | Secure password hashing |
| jsonwebtoken | JWT authentication handling |
| CORS | Cross-Origin Resource Sharing |
| dotenv | Environment variable security |

---

## Database

| Technology | Purpose |
| --- | --- |
| MongoDB Atlas | Cloud-hosted NoSQL database cluster |
| MongoDB Compass | Local database visualization & checks |

---

# 📂 Project Structure

```text
book_store_react/
│
├── server/                              # Backend Express API
│   │
│   ├── config/
│   │   └── db.js                        # MongoDB Atlas connection
│   │
│   ├── controllers/                     # Route business logic
│   │   ├── authController.js            # Auth logic with validation & hashing
│   │   ├── bookController.js            # Book CRUD operations
│   │   └── userController.js            # User favorites & subscriptions
│   │
│   ├── middleware/                      # Auth & Admin protection
│   │   └── authMiddleware.js            # JWT token verifier
│   │
│   ├── models/                          # Mongoose Schemas
│   │   ├── Book.js                      # Book schema (with isPremium flag)
│   │   └── User.js                      # User schema (with isAdmin flag)
│   │
│   ├── routes/                          # API endpoints
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env                             # Backend environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                        # Express server entry point
│
│
├── src/                                 # React Frontend
│   │
│   ├── assets/                          # Static graphics & images
│   │
│   ├── components/                      # Reusable UI components
│   │   ├── BookCard/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   └── ...
│   │
│   ├── pages/                           # Application views
│   │   ├── AddBook/
│   │   ├── Auth/                        # Login & Registration (with inline validation)
│   │   ├── BookDetails/
│   │   ├── Books/                       # Catalog browse view
│   │   ├── Home/
│   │   ├── Profile/                     # User & Reader profile
│   │   └── NotFound/
│   │
│   ├── services/
│   │   └── api.js                       # Axios instance configuration
│   │
│   ├── App.css
│   ├── App.jsx                          # Main routing & state controller
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json                         # Frontend dependencies
└── vite.config.js

```

---

# 🗄️ Database Architecture (`bookheaven`)

### Book Schema Example

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "category": "Self Help",
  "description": "A practical guide to building better habits.",
  "cover": "image-url",
  "rating": 4.8,
  "publishedYear": 2018,
  "isPremium": false,
  "createdAt": "2026-11-15"
}

```

### User Schema Example

```json
{
  "name": "Shubha Kapoor",
  "email": "admin@gmail.com",
  "password": "hashed_password_via_bcrypt",
  "isAdmin": true,
  "isSubscribed": false,
  "createdAt": "2026-11-15"
}

```

---

# 📡 REST API Endpoints

## Base URL

```text
http://localhost:5000/api

```

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/` | Public | API Health check |
| `POST` | `/auth/register` | Public | Register with regex & password checks |
| `POST` | `/auth/login` | Public | Authenticate user & issue JWT token |
| `GET` | `/books` | Public | Fetch all books from MongoDB |
| `GET` | `/books/:id` | Public | Fetch single book details |
| `POST` | `/books` | Admin Only | Add a new book to database |
| `PUT` | `/books/:id` | Admin Only | Update an existing book |
| `DELETE` | `/books/:id` | Admin Only | Remove a book from database |
| `GET` | `/users/favorites` | Private | Fetch user's favorite books |

---

# 🚀 Getting Started

## Prerequisites

Ensure you have installed:

* Node.js v18 or later
* npm
* MongoDB Atlas account

---

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/Shubha-Kapoor/book_store_react.git](https://github.com/Shubha-Kapoor/book_store_react.git)
cd book_store_react

```

### 2️⃣ Install Frontend Dependencies

From the project root:

```bash
npm install

```

### 3️⃣ Configure the Backend

Navigate to the server directory and install dependencies:

```bash
cd server
npm install

```

### 4️⃣ Create Environment Variables

Create a file named `.env` inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookheaven?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key

```

> ⚠️ Never upload your `.env` file to GitHub.

### 5️⃣ Start the Backend Server

Inside the `server` directory:

```bash
npm run dev

```

### 6️⃣ Start the Frontend Application

Open a new terminal, return to the project root, and run:

```bash
cd ..
npm run dev

```

The frontend will run at **`http://localhost:5173`**.

---

# 🔮 Future Scope

* 💳 Subscription payment gateway integration (Stripe / Razorpay) for premium tiers
* ☁️ Cloud image and PDF file storage integration (Cloudinary)
* ❤️ Personal user reading lists and favorites management
* 🌐 Production cloud deployment (Render & Vercel)

---

# 👩‍💻 Author

**Shubha Kapoor**

* 🎓 BCA Student & Developer
* 💻 React & MERN Stack Developer
* 🎨 UI/UX & Tech-Driven Storytelling Enthusiast

### Connect with me

* **GitHub:** [Shubha Kapoor's GitHub](https://github.com/Shubha-Kapoor)
* **LinkedIn:** [Shubha Kapoor's LinkedIn](https://www.linkedin.com/in/shubha-kapoor-a3963a308)

---

# 📄 License

This project is created for educational and professional portfolio purposes.

```

```
