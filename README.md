# VideoTube Backend Project

This repository contains the **backend codebase** for **VideoTube**, a full-fledged video streaming platform built similar to YOUTUBE.  
The backend is implemented core in **JavaScript** using **Node.js**, **Express**, and **MongoDB**, following scalable and production-grade practices.

---

## 1. Project Overview

**VideoTube Backend** provides core APIs required for a modern video platform:
- **User Authentication and Authorization** (JWT-based)
- **Video Uploading, Streaming, and Management** (Cloudinary integration)
- **Comments and Replies** with pagination
- **Playlists** (add/remove videos)
- **Subscriptions** (channel follow/unfollow system)
- **Like System** for videos, comments, and tweets
- **Search, Sort, and Pagination** for videos
- **Comprehensive Error Handling** and **Input Validation**
- **Modular Code Architecture** with services, controllers, and utilities

This project was developed as part of my backend engineering portfolio to demonstrate **production-level API development skills**.

---

## 2. Tech Stack

- **Language**: JavaScript (es-6, type -> module)
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cloud Storage**: Cloudinary (for videos and thumbnails)
- **Authentication**: JSON Web Tokens (JWT)
- **Utilities**: bcrypt, cookie-parser, multer for file handling
- **API Response**: Custom ApiResponse and ApiError classes
- **Pagination**: mongoose-aggregate-paginate-v2
- **Testing**: Postman (Industry Standard)
- **Other Tools**: dotenv for environment variables

---

## 3. Folder Structure

```
VideoTube_BackEnd_Project/
│
├── public/
│   └── temp/                  # Temporary file storage (e.g., uploads before Cloudinary)
│
├── src/
│   ├── controllers/           # Route handler functions (business logic entry)
│   ├── db/                    # Database connection configuration (MongoDB)
│   ├── middlewares/           # Custom Express middlewares (auth, error handling)
│   ├── models/                # Mongoose schemas and models (User, Video, Comment, etc.)
│   ├── routes/                # API route definitions (organized by module)
│   └── utils/                 # Utility functions, helpers, and custom classes
│   └── app.js                 # For configuring the main app for routing using Express.js
│   └── constants.js           # For storing constants used in overall project
│   └── index.js               # Entry point for the project
│
├── .env.example               # Sample environment variables
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
├── .prettierrc                # For maintaining consistency in the syntax
```

---

## 4. API Features

### Authentication & Users
- Register, login, logout
- Get user profile and update details

### Videos
- Upload video file and thumbnail to Cloudinary
- Fetch videos with search, sort, and pagination
- Delete videos (including Cloudinary cleanup)

### Comments
- Add comments to a video
- Get paginated comments with user details
- Delete and edit comments

### Playlists
- Create and update playlists
- Add/remove videos from playlists
- Fetch user playlists

### Subscriptions
- Subscribe/unsubscribe to channels
- Fetch subscriber count and details

### Likes
- Like/unlike videos, comments, or tweets
- Fetch liked content

---

## 5. How to Run Locally

### Prerequisites
- Install **Node.js v18+**
- Install **MongoDB** (local or cloud instance via MongoDB Atlas)
- Create a **Cloudinary account** for media storage

### Step 1: Clone the Repository
```bash
git clone https://github.com/shahbaz957/VideoTube_BackEnd_Project.git
cd VideoTube_BackEnd_Project
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` file in the project root using the provided `.env.example` as a reference:
```bash
PORT=8000
MONGODB_URI=mongodb://localhost:27017/videotube
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### Step 4: Run the Server
```bash
npm start
```

Server will start on:
```bash
http://localhost:8000
```

---

## 6. API Documentation

For the full and detailed API documentation, please see the [APIdocumentation.md](https://github.com/shahbaz957/VideoTube_BackEnd_Project/blob/main/APIdocumentation.markdown) file.

---

## 7. Author

**Mirza Shahbaz Ali Baig**  
Software Engineer | AI Engineer | Full Stack Developer (in progress)  

- 📧 [Email me](mailto:mirzashahbazbaig724@gmail.com)  
- 🔗 [Connect with me on LinkedIn](https://www.linkedin.com/in/mirza-shahbaz-ali-baig-3391b3248)
