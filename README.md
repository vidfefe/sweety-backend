# 🍰 Sweety Shop (Backend)

## 📖 Description
Backend service for the **Sweety Shop** online store.  
Key features include:  
- 👤 User authentication & authorization (JWT + bcrypt) 
- 🛒 Product and order management
- 💳 Secure payments with Stripe
- ☁️ Image storage with Cloudinary
- 🔐 Middleware for security (CORS, cookie-parser, dotenv)

---

## 🛠 Technologies Used
- **Node.js** + **Express.js**
- **PostgreSQL** + **Sequelize**
- **Stripe API** for payments
- **Cloudinary** for file storage
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration
- **cookie-parser**, **CORS**, **express-fileupload**

---

## ⚙️ How to Run

```bash
# 1. Clone the repository
git clone https://github.com/vidfefe/sweety-backend.git
cd sweety-backend

# 2. Install dependencies
npm install

# 3. Create a .env file based on .env.example and fill in your values
cp .env.example .env
# Then open .env and add your own values

npm run start-dev
```

[Demo Sweety Shop](https://sweety-nine.vercel.app/)
