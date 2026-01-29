🛒 Full-Stack E-Commerce Application

A full-stack e-commerce application built using modern JavaScript technologies.
This project focuses on backend architecture, authentication, and API design, along with frontend integration.

It is intended as a learning + portfolio project to demonstrate real-world full-stack development practices.


🚀 Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

bcrypt (Password hashing)

Yup (Request validation)

Nodemon


📌 Project Overview

This project is a full-stack e-commerce system that includes:

User authentication using JWT

Secure password storage with bcrypt

Cart functionality

RESTful API structure

Request validation and middleware

Frontend and backend communication via APIs

The goal of this project is to understand how real backend systems are structured and how they connect with a modern frontend.


🧩 Backend Structure

The backend follows a modular structure:

backend/
│── cart/
│   ├── cart.controller.js
│   ├── cart.service.js
│   ├── cart.model.js
│   └── cart.validation.js
│
│── middleware/
│   ├── authentication.middleware.js
│   ├── validate.mongo.id.js
│   └── validate.req.body.middleware.js
│
│── db.connection.js
│── index.js

Backend Concepts Used

Controller → Service → Model pattern

JWT authentication middleware

Request body validation using Yup

MongoDB ObjectId validation

Centralized database connection


🖥️ Frontend Overview

The frontend is built using Next.js with the App Router.

Server-side rendering

Clean component structure

API calls handled using Axios

Ready for scaling with more features


⚙️ Getting Started
Prerequisites

Node.js

MongoDB (local or cloud)

Backend Setup
cd backend
npm install
npm run dev


Backend server runs on:

http://localhost:PORT


(Update MongoDB connection in db.connection.js)

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000


🔐 Authentication

JWT is used for authentication

Protected routes require a valid token

Passwords are hashed using bcrypt

Authentication handled through middleware


🎯 Purpose of This Project

This project was built to:

Practice real-world full-stack development

Learn backend architecture beyond basic CRUD

Understand authentication and security concepts

Build a portfolio-ready project for internships and junior roles


🚧 Future Improvements

Product management (admin panel)

Order and checkout system

Payment gateway integration

Role-based access control

Improved UI/UX

Deployment


👤 Author

Kunal Shrestha
Aspiring Full-Stack / MERN Developer
