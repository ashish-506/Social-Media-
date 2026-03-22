# 🚀 Scalable Social Media REST API

A production-grade RESTful backend for a social networking platform, designed to handle **high fan-out feeds, complex connection states, and stateless authentication** without falling into common backend performance traps.

🔗 **Live API Docs (Swagger):**
https://social-media-cbo2.onrender.com/api-docs/

---

## 🧠 Engineering Highlights

### ⚡ Efficient Feed Generation (Eliminating N+1 Problem)

* Designed feed retrieval using MongoDB’s `$in` operator to fetch posts from multiple connections in a **single query**
* Avoids iterative querying (N+1 problem), reducing:

  * ❌ 50+ DB calls (naive approach)
  * ✅ → 1 optimized query
* Ensures scalability as user connections grow

---

### 🔄 Connection State Machine (Robust Graph Handling)

Implemented a deterministic state machine to manage user relationships:

**States:**

* `pending`
* `accepted`
* `rejected`

**Transitions handled safely:**

* Send Request
* Accept / Reject
* Withdraw Request
* Remove Connection

✔ Prevents:

* Duplicate requests
* Invalid transitions
* Race conditions in updates

---

### 🛡 Crash-Resilient Data Handling

* Used **strict MongoDB projections** to limit unnecessary data
* Applied **optional chaining (`?.`)** to safely handle:

  * Deleted users
  * Orphaned posts
* Prevents runtime crashes like:

  * ❌ `Cannot read property of null`

---

### 🔐 Stateless Authentication (JWT)

* Fully stateless auth using **JSON Web Tokens**
* Supports:

  * HTTP-only cookies (secure browser flow)
  * Authorization headers (API clients/mobile)
* Passwords hashed using `bcrypt`

---

### 📄 API-First Development (Swagger / OpenAPI)

* Complete **OpenAPI 3.0 spec** written alongside routes
* Enables:

  * Interactive testing
  * Clear frontend-backend contracts
  * Faster integration

---

## 🏗 Architecture Overview

* **Layered Structure:**

  * Routes → Controllers → Services → Models
* **Database:** MongoDB with Mongoose ODM
* **Indexing Strategy:**

  * Optimized queries on user connections & posts
* **Error Handling:**

  * Centralized middleware for consistent API responses

---

## 💻 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT, bcrypt
* **Documentation:** Swagger UI, swagger-jsdoc

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ashish-506/Social-Media-/tree/main
cd Social-Media-
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

Swagger docs:

```
http://localhost:5000/api-docs
```

---

## 📌 Key API Endpoints (Sample)

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | /api/auth/register   | Register new user       |
| POST   | /api/auth/login      | Login user              |
| GET    | /api/feed            | Get personalized feed   |
| POST   | /api/connect/send    | Send connection request |
| POST   | /api/connect/respond | Accept/Reject request   |

---

## ⚠️ Design Decisions & Tradeoffs

* **One-way connection model** simplifies feed generation vs bidirectional graph
* Feed computed on read (not precomputed) to avoid:

  * write amplification
  * stale cache issues
* Stateless JWT chosen over sessions for scalability

---

## 📈 Future Improvements

* Redis caching for feed optimization
* Pagination with cursor-based approach
* Rate limiting & abuse protection
* WebSocket support for real-time updates

---

## 🤝 Contribution

PRs and suggestions are welcome. If you spot inefficiencies or edge cases, raise an issue.

---

## 📜 License

MIT License
