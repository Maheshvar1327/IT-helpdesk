# Automated IT Service Desk & Support Ticket Portal (MERN)

## Three pages
1. Login / Register
2. Submit Ticket (category and priority are detected automatically)
3. Dashboard (users see own tickets, admin manages all)

## How to run
Requirements: Node.js and MongoDB installed and running.

### Backend
    cd server
    copy .env.example to .env
    npm install
    npm run dev

### Frontend (new terminal)
    cd client
    npm install
    npm run dev

Open http://localhost:5173
Register one account as "IT Admin" and another as "Student / Staff" to test both views.
