Project Overview:

Wanderlust is a full-stack web application designed for travel enthusiasts. It allows users to explore, create, and share their travel experiences, as well as review various travel destinations. The project is built using a robust backend powered by Node.js, Express.js, and MongoDB for data storage. REST APIs facilitate smooth communication between the client and server.

Key Features:

User Authentication: Secure login and signup pages with hashed passwords.

Dynamic Pages: Built using EJS to render dynamic content based on user input and database queries.

Destination Listings: Users can create, edit, and delete destination listings.

Reviews: Users can leave reviews and ratings for destinations.

API Integration: Utilizes REST APIs to fetch and manage data efficiently.

Responsive Design: Ensures smooth user experience across devices.

This project highlights the use of middleware for route protection, data validation, and handling CRUD operations with MongoDB. It also demonstrates RESTful principles to create an efficient and scalable API.

Technologies Used:

Frontend: JavaScript, EJS (Embedded JavaScript for templating)

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

API: RESTful API for communication between frontend and backend
NPM Packages: Various Node.js packages for routing, validation, security, etc.
Middleware: Authentication, authorization, and other middlewares to handle various tasks .


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
Logging Middleware: For logging requests .
Error Handling Middleware: To manage errors gracefully.
