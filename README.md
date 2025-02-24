# Hono + Cloudflare Workers + Prisma Blog API

## 🚀 Project Overview
This is a **serverless API** built using **Hono**, **Cloudflare Workers**, and **Prisma** with PostgreSQL (via NeonDB). The API supports **user authentication (JWT)** and **blog management** with a **global database connection**.

---

## 📂 Project Structure
```
├── prisma/                   # Prisma configurations & migrations
│   ├── migrations/           # Database migration files
│   ├── schema.prisma         # Prisma schema file
├── src/
│   ├── middlewares/auth.ts   # JWT authentication middleware
│   ├── routes/
│   │   ├── user.ts           # User authentication routes
│   │   ├── blog.ts           # Blog-related routes
│   ├── index.ts              # Main entry point for Hono app
├── .gitignore                # Ignoring unnecessary files
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── wrangler.jsonc            # Cloudflare Workers config
└── README.md                 # Documentation
```

---

## ⚡ Getting Started

### 1️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 2️⃣ Setup Environment Variables
Create a `.env` file and add:
```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
```

### 3️⃣ Run Migrations
```sh
yarn prisma migrate dev  # Apply migrations to your DB
```

### 4️⃣ Start Development Server
```sh
yarn dev
```

### 5️⃣ Deploy to Cloudflare Workers
```sh
yarn wrangler deploy
```

---

## 🛠 API Endpoints

### **Auth Routes** (`/api/v1/user`)
- **POST** `/signup` → Register a user
- **POST** `/signin` → Authenticate user
- **GET** `/logout` → Logout user

### **Blog Routes** (`/api/v1/blog`)
- **POST** `/` → Create a blog (Auth required)
- **GET** `/` → Fetch all blogs
- **GET** `/:id` → Get a single blog by ID
- **PUT** `/:id` → Update a blog (Auth required)
- **DELETE** `/:id` → Delete a blog (Auth required)

---

## 🚀 Technologies Used
- **Hono** → Fast Edge framework for Cloudflare Workers
- **Prisma** → Database ORM with NeonDB (PostgreSQL)
- **JWT** → Secure authentication with Hono/JWT
- **Cloudflare Workers** → Serverless backend
- **Yarn** → Package management

---

## 📌 Notes
- **Using Prisma Accelerate** for optimized queries.
- **JWT-based authentication** with middleware.
- **Middleware implementation** for route protection.

---

## 🤝 Contribution
Feel free to contribute! Fork the repo, create a new branch, and submit a PR. 🚀

