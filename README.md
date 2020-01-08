# Weight-Lifting-8-Backend

## **Description**
This is the backend portion of a Weight Lifting Journal application. There are both`localhost` and `herkoku` links provided within this documentation to test and use the live version of this application. 

**Dependencies:**
```
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "gitignore": "^0.6.0",
    "helmet": "^3.21.2",
    "jsonwebtoken": "^8.5.1",
    "knex": "^0.20.6",
    "knex-cleaner": "^1.3.0",
    "pg": "^7.17.0",
    "sqlite3": "^4.1.1"
```



## **Project Initialization**
1. Install Insomnia
2. Create New Request
3. "GET" Request
4. Use `http://localhost:4000` as your base URL.
5. Request will result with "Server is Running"



## **Heroku Link**:

https://weight-lifting-8.herokuapp.com

# **End Points**
This document contains three main routers: `users-router`, `workout-router`, and `exercise-router`.

``End Points`` can be accessed by inserting it at the end of the ``HEROKU`` or ``LOCALHOST`` links above. 

``Request Type`` will let you know which type of request is needed to access the specific end point.

``Requirements`` are exactly what is needed for the end point to work.


# **Users-Router**

## **Register**
**End Point**: ``/auth/register``

**Request Type**: ``POST``

**Requirements**:
    email, password, firstName, & lastName
    
    JSON REQUIREMENTS

    {
        email: 'test@email.com', 
        password: 'password', 
        firstName: 'Paul', 
        lastName: 'Blart'
    }
## **Login**
**End Point**: ``/auth/login``

**Request Type**: ``POST``

**Requirements**:
    email, password
 

    {
        email: 'test@email.com', 
        password: 'password', 
    }

1. Returns a token that will expire in 1 hour and will require you to login again.


    




 