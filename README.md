Project Manager Web App (React)

A responsive Project Management Web Application built with React that allows users to:

Create multiple Projects

Add and manage Tasks inside each project

Track task progress using status columns:

📝 To Do

🚧 In Progress

✅ Finished

The app implements full CRUD functionality and uses Local Storage for persistent data.

🚀 Features
📁 Project Management

Create new projects

Open project

Edit project details

Delete projects

✅ Task Management (Inside Each Project)

Add tasks to a specific project

Edit/update tasks

Delete tasks

Change task status:

To Do

In Progress

Finished

Automatically group tasks by status

⚙️ Technical Features

Full CRUD operations

Persistent storage using Local Storage

Built with React Hooks (useState, useEffect)

Reusable and modular component structure

Responsive UI layout

🛠️ Tech Stack

Frontend: React

State Management: React Hooks

Storage: Browser Local Storage

Styling: CSS (Responsive Design)

🏗️ Application Structure
project-manager/
│
├── public/
├── src/
│   ├── components/
│   │   ├── ProjectList.js
│   │   ├── ProjectForm.js
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   ├── TaskCard.js
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
├── package.json
└── README.md
🔄 How It Works

User creates a Project

Each project contains multiple Tasks

Each task has:

Title

Description

Status (To Do / In Progress / Finished)

Tasks are displayed in columns based on their status

All data is saved in Local Storage

Data persists after page refresh

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/project-manager.git
2️⃣ Navigate into the project directory
cd project-manager
3️⃣ Install dependencies
npm install
4️⃣ Start the development server
npm start

App runs at:

http://localhost:3000

📈 Future Improvements

Drag-and-drop task movement

Due dates and priority levels

Search and filter tasks

Backend integration (Node.js / Firebase)

User authentication

Dashboard analytics
