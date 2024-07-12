# Student Portal

## Description

The Student Portal is a comprehensive web application designed to manage student information and academic records. Built with Next.js, it serves both the front-end and back-end functionalities. The application utilizes MongoDB for data storage, Nodemailer for sending verification emails, and JWT for secure email token verification.

## Features

### Admin Capabilities
- **Register New Students:** Admin can add new student entries to the database by registering their registration number.
- **Post Academic Information:** Admin can post exam results, transcripts, and course schedules.
- **Approve Unit Registration:** Admin can approve student unit registrations.
- **Manage Courses:** Admin can add new courses to the database.
- **Password Reset:** Admins can change their password through a reset link sent to their email.

### Student Capabilities
- **Register Account:** Students can register their email and password at the `/register` URL path.
- **Email Verification:** Students must verify their email by clicking on a JWT token sent to them, which expires within a day.
- **Access Academic Records:** Once logged in, students can view their transcripts, exam results, and course schedules.
- **Register for Units:** Students can register for units for the current semester.
- **Password Reset:** Students can change their password through a reset link sent to their email.

### Security
- **Role-Based Access:** Middleware ensures students cannot access the admin paths of the website.
- **Email Verification:** JWT tokens are used for secure email verification.

### CRUD Operations
The application implements Create, Read, Update, and Delete (CRUD) methods for managing stored information.

## Technologies Used
- [Next.js](https://nextjs.org/): Framework for both front-end and back-end development.
- [Nodemailer](https://nodemailer.com/): Module for sending verification emails.
- [MongoDB](https://www.mongodb.com/): Database for storing student and academic information.
- [JWT](https://jwt.io/): JSON Web Tokens for signing and verifying email tokens.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-portal.git

2. Navigate to the project directory:
   ```bash
   cd student-portal
   
3. Install dependencies:
   ```bash
   npm install

4. Configuration:

Create a .env.local file in the root directory of the website and update the following variables
```env
    MONGODB_USERNAME = your_mongodb_username
    MONGODB_PASSWORD = your_mongodb_password
    NEXTAUTH_SECRET = your_nextauth_secret

    MONGO_URI=your_mongodb_uri
    EMAIL_SECRET=your_jwt_secret
    GMAIL_USER=your_email_address
    GMAIL_PASS=your_email_password
```

4. Running the Application:
   ```bash
   npm run dev

