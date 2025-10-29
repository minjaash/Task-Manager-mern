Task Manager Application (MERN Stack)

A simple Task Manager App built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to register, log in, and manage their daily tasks with full CRUD functionality.

🚀 Features:

🔐 User Authentication using JWT and bcrypt

🧑‍💻 User Registration & Login

🗂️ Create, Read, Update, Delete (CRUD) operations for tasks

💾 MongoDB (Mongoose) for database management

⚛️ React + Redux Toolkit for frontend state management

🌐 RESTful API with Express.js backend

🎨 Responsive design using Bootstrap

🛠️ Technologies Used:-

Frontend:

React.js

Redux Toolkit

React Router DOM

Axios

Bootstrap


Backend:

Node.js

Express.js

MongoDB & Mongoose

bcrypt

JWT (jsonwebtoken)

dotenv

cors

⚙️ Folder Structure:
project/
│
├── server/
│   ├── index.js                  # Main server entry point
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   └── tasksModel.js         # Task schema
│   └── .env                      # Environment variables
│
├── Task-Manager/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── UserTasks.jsx
│   │   │   ├── Edit.jsx
│   │   │   └── Delete.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── taskSlice.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

⚙️ Environment Variables:

Create a .env file inside the server directory and include:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskdb
JWT_SECRET_KEY=your_jwt_secret


🧩 Installation & Setup:
1️⃣ Clone the Repository
git clone https://github.com/yourusername/task-manager.git
cd task-manager

2️⃣ Backend Setup (Server):
cd server
npm install


Run the server:

node index.js


Server will start on:

http://localhost:4000

3️⃣ Frontend Setup (Task-Manager)
cd ../Task-Manager
npm install
npm start


Frontend will run on:

http://localhost:3000

📡 API Endpoints:
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Log in and receive JWT token
POST	/user	Fetch logged-in user details
POST	/addTask	Add a new task
POST	/userTasks	Get all tasks for a specific user
DELETE	/deleteTask	Delete a task by ID
POST	/getEditTask	Fetch a single task by ID for editing
PUT	/updateTask	Update an existing task

🧠 Redux Flow:

taskSlice.js defines Redux state and reducer functions.

setTasks() updates the global allTasks state.

Components use Redux hooks (useSelector, useDispatch) for efficient state management.


🧑‍💻 Application Flow:

Register / Login — User credentials are stored in MongoDB with bcrypt-hashed passwords.

Token Handling — Upon successful login/registration, a JWT token is stored in localStorage.

Protected Routes — The /profile page and task APIs require valid authentication.

CRUD Operations — Users can add, edit, delete, and view their tasks.


🧾 Future Enhancements:

✅ Input validation using Joi or Express Validator

🔄 JWT refresh token system

🌙 UI improvements (dark mode, task filters, etc.)

📱 Full mobile responsiveness
