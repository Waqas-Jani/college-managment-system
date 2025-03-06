# College Management System API

## 📌 Project Overview (In Progress...)

This is a **Node.js & MongoDB**-based **College Management System API** that handles students, faculty, courses, classes, timetables, and attendance management.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT & bcrypt
- **Validation**: Joi
- **Real-Time Notifications**: Socket.IO
- **File Upload**: Multer

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone https://github.com/Waqas-Jani/college-managment-system.git
cd folder_name
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/college
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run Server

```sh
npm run server
```

---

## 🔑 Authentication API

### **Register (Super Admin/Admin/Faculty/Student)**

```http
POST /api/v1/admin/register
```

```http
POST /api/v1/faculty/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "admin"
}
```

### **Login**

```http
POST /api/v1/admin/login
```

```http
POST /api/v1/faculty/login
```

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "your_jwt_token",
  "role": "admin"
}
```

---

## 👨‍🏫 Faculty API

### **Create Faculty** (Admin Only)

```http
POST /api/v1/faculty/register
```

### **Update Faculty** (Admin Only)

```http
POST /api/v1/faculty/by-admin/:id
```

### **Delete Faculty** (Admin Only)

```http
POST /api/v1/faculty/:id
```

### **Change Passowrd Faculty**

```http
PUT /api/v1/faculty/change-password/:id
```

### **Update Profile Faculty**

```http
PUT /api/v1/faculty/edit/:id
```

### **Get Faculty** (with Pagination & Filter)

```http
GET /api/v1/faculty/all?page=1&limit=10&name=example
```

---

## 🎓 Department API

### **Create Department** (Admin Only)

```http
POST /api/v1/department
```

### **Get All Departments** (with Pagination & Filter)

```http
GET /api/v1/department/al?page=1&limit=10&name=computer
```

### **Update Department**

```http
PUT /api/v1/department/edit/:id
```

### **Delete Department** (Admin Only)

```http
DELETE /api/v1/department/:id
```

---

## 🏫 Course API

### **Create Course** (Admin Only)

```http
POST /api/v1/course
```

### **Get All Courses** (with Pagination & Filter)

```http
GET /api/v1/course/al?page=1&limit=10&name=example
```

### **Update Course**

```http
PUT /api/v1/course/edit/:id
```

### **Delete Course** (Admin Only)

```http
DELETE /api/v1/course/:id
```

---

## 🛠️ Error Handling Middleware

This API includes a global error handler for structured error responses.

Example error response:

```json
{
  "message": "Invalid email or password"
}
```

---

## 📬 Contributing

- Fork the repo
- Create a feature branch
- Submit a pull request 🚀

---

## 🔗 License

This project is **MIT licensed**.
