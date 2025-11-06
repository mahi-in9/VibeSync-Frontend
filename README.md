# 🎶 VibeSync – Plan Together, Effortlessly

## Introduction
**VibeSync** is a smart, mood-based group planning web application designed to simplify decision-making among friends, families, or teams.  
From hangouts to trips, VibeSync eliminates endless group chats by letting users **create groups**, **vote on plans**, and receive **personalized suggestions** based on collective vibes.

This app brings the convenience of collaborative planning, emotion-driven suggestions, and real-time voting to one intuitive interface.  
Developed with **React.js**, **Vite**, and **Firebase Authentication**, it focuses on seamless UI/UX, interactivity, and group coordination.

---

## Project Type
**Full-Stack Web Application (Frontend-focused)**

---

## Deployed Application
Frontend: [Live VibeSync App](https://vibe-sync-frontend-git-main-mahi2.vercel.app/)

---

## Directory Structure
/
├── README.md
├── public/
│ ├── favicon.ico
│ └── manifest.json
│
├── src/
│ ├── assets/ # Images, icons, and static assets
│ ├── components/ # Reusable UI components (Polls, Cards, Buttons)
│ ├── context/ # Context providers (Auth, Theme, Group, etc.)
│ ├── hooks/ # Custom hooks for logic reuse
│ ├── pages/ # Application pages (Home, Groups, Polls, Profile)
│ ├── services/ # Firebase and API integrations
│ ├── utils/ # Helper functions and configuration utilities
│ ├── App.jsx # Root component
│ └── main.jsx # React entry point
│
├── .env # Environment configuration
├── vite.config.js
├── package.json
└── tailwind.config.js


---

## 🎥 Video Walkthrough of the Project
[Click Here – Project Walkthrough](#) *(Add YouTube link when ready)*  

## 🎥 Video Walkthrough of the Codebase
[Click Here – Codebase Walkthrough](#) *(Add YouTube link when ready)*  

---

## ✨ Features

- **👥 Group Creation & Management**:  
  Create and manage friend groups for different activities — from trips to game nights.

- **👍 Polls, Voting & RSVP System**:  
  Real-time voting to decide plans, with emoji-based reactions and attendance tracking.

- **💡 Smart Suggestions (AI/ML Ready)**:  
  Personalized movie, restaurant, and activity ideas based on group mood and history.

- **🎯 Mood-Based Planning**:  
  Filter plans by “Chill”, “Adventurous”, or “Foodie” to instantly match the group’s vibe.

- **📱 Responsive Design**:  
  Optimized for smartphones, tablets, and desktops with adaptive layouts.

- **🔐 Secure Authentication**:  
  Firebase authentication ensures safe and easy logins via email or Google.

- **🌙 Dark/Light Theme Mode** *(optional)*:  
  Theme toggle support for better accessibility and user experience.

---

## 🧠 Design Decisions & Assumptions

- Designed with a **mobile-first approach** for accessibility and user convenience.  
- Built with **component reusability** and **scalable architecture** in mind.  
- Firebase was chosen for authentication to streamline onboarding and reduce backend overhead.  
- Future-ready design — ready for AI-based recommendation engine integration.

---

## ⚙️ Installation & Getting Started

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/your-username/vibesync.git

# Navigate into the project directory
cd vibesync

# Install dependencies
npm install

# Start the development server
npm run dev
