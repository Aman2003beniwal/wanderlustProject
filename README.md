Project Overview:
Technologies Used:
Frontend: JavaScript, EJS (Embedded JavaScript for templating)
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose ODM)
API: RESTful API for communication between frontend and backend
NPM Packages: Various Node.js packages for routing, validation, security, etc.
Middleware: Authentication, authorization, and other middlewares to handle various tasks
Core Features:
User Authentication:
Login and Signup pages.
Password hashing 
JWT (JSON Web Token) or session-based authentication.

CRUD Operations for Listings:
Create: Page to add a new listing.
Read: View existing listings.
Update: Edit an existing listing.
Delete: Remove a listing.

Review System:
Users can leave reviews on listings.
Each review can have a rating system (stars or numeric scale).

Middleware:
Authentication Middleware: To verify users before accessing certain routes.
Logging Middleware: For logging requests (e.g., using morgan).
Error Handling Middleware: To manage errors gracefully.
