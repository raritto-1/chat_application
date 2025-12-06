Chat Application (FastAPI + WebSockets)

A real-time chat application built using FastAPI and WebSockets. Users can create rooms and chat instantly. No database is used; all messages exist only during the session.

Features

Real-time messaging with WebSockets

Create or join chat rooms

No login required

No database

Simple HTML + JS frontend

Fully async backend

Tech Stack

FastAPI

WebSockets

HTML, CSS, JavaScript

Uvicorn

Project Structure
chat_application/
│
├── main.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md

How It Works

Each user connects via WebSocket.

Users create or join rooms.

Messages are broadcast to everyone in the same room.

No message history is stored.

Installation
git clone https://github.com/raritto-1/chat_application.git
cd chat_application
pip install -r requirements.txt

Run the app
uvicorn main:app --reload


Open in browser:

http://127.0.0.1:8000

Future Improvements

Add database for chat history

Add authentication

Add timestamps
  
Improve UI

Show active users, typing status, notifications

License

Free and open-source.
