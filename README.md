## **Insyd Notification System(POC)**

A proof-of-concept notification system for Insyd, a social web platform for the Architecture Industry. This POC demonstrates real-time notifications using ReactJS frontend, NodeJS backend, MongoDB, and Socket.IO.

## **Project Overview**

Users can enter their user ID to register with the system.

Users can create notifications (like, comment, follow).

Notifications are stored in MongoDB and sent in real-time to the frontend using Socket.IO.

The frontend displays notifications dynamically in a notification list.

This POC is designed for 100 DAUs but follows an event-driven architecture scalable to millions of users.


## **Installation**

1.**Clone the repository**:

  git clone https://github.com/12345-dd/insydNotificationFrontend

  git clone https://github.com/12345-dd/insydBackend

2.**Navigate to the project directory**:

  cd insydNotificationFrontend 

3.**Install dependencies**:

  npm install

## **Usage**

To start the development server:

npm run dev

The app will be available at http://localhost:5173/.

## **Live Demo**

The project is hosted on Netlify. You can access it here:

**https://insydnotify.netlify.app/**


## **Technologies Used**

React

Vite

Material ui

Nodejs

Expressjs

MongoDB

Socket.io
