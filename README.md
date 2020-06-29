# **Weight-Lifting-Journal Backend**

### **Description**
This is the backend portion of a Weight Lifting Journal application. There are both `localhost` and `herkoku` links provided within this documentation to test and use the live version of this application. 

### **Objective**
Give users the ability to monitor their progress at the gym. Users can create an account and Implement all CRUD operations to read, add, edit, and delete exercises and workouts.

### **Dependencies**
```
    "bcryptjs": "^2.4.3",
    "cross-env": "^6.0.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^3.21.2",
    "jsonwebtoken": "^8.5.1",
    "knex": "^0.20.6",
    "knex-cleaner": "^1.3.0",
    "pg": "^7.17.0",
    "sqlite3": "^4.1.1"

	"devDependencies": {
		"jest": "^24.9.0",
		"nodemon": "^2.0.2",
		"supertest": "^4.0.2"
	},
```

### **Technologies Used**
- Node.js
- Express.js
- Knex.js
- PostgreSQL
- JWT Authentication


### **Project Initialization**
1. Install Insomnia
2. Create New Request
3. "GET" Request
4. Use `http://localhost:4000` as your base URL.
5. Request will result with "Server is Running"



### **Heroku Link**: https://weight-lifting-8.herokuapp.com

## **Route Descriptions**
Append ``End Points`` to the end of the ``HEROKU`` or ``LOCALHOST`` links above. 

This document contains three main routers:
1. `users-router`
2. `workout-router`
3. `exercise-router`


``Request`` will let you know which type of request is needed to access the specific end point.

``Endpoints`` are to be added to the end of the base api.

``Auth`` determines whether a token is needed to access that endpoint.

``Return`` is the expected data to be returned with specific endpoint.


## **Endpoint Contents**
### *Users*
| Requests          | Endpoints               | Auth(JWT)     | Return                       |
|-----------------  |:-----------------------:|:-----------:  |:----------:                  |
| POST Registration | /api/auth/register      | None          |ID, Email, Encrypted Password |
| POST Login        | /api/auth/login         | None          |UserID, Token, Message        |
| GET User By ID    | /api/auth/:id           | None          |User Obj, Workout obj, Message|
| GET All Users     | /api/auth               | None          |Message, User Obj             |

### *Workouts*
| Requests                         | Endpoints                | Auth(JWT)   | Return   |
|-----------------                 |:-----------------------: |:-----------:|:----------:|
| GET Workout By ID                | /api/workouts/single/:id | Required    | ID, Workout obj |
| GET Workout List for User        | /api/workouts/:id        | Required    | List of Workouts |  
| POST Add Workout to User         | /api/workouts/:id        | Required    | Workout ID |
| PUT Edits Workout By ID          | /api/workouts/:id        | Required    | Updated Workout |
| DELETE Deletes Workout from list | /api/workouts/:id        | Required    | Success Message |

### *Exercises*
| Requests                         | Endpoints                       | Auth(JWT)   | Return   |
|-----------------                 |:-----------------------:        |:-----------:|:----------:|
| GET Workout Exercises            | /api/exercises/:id              | Required    | Data Obj |
| POST Adds Exercise By Workout ID | /api/exercises/:id              | Required    |Complete Workout Obj|
| PUT Edits Exercise               | /api/:exercise_id/exercises/:id | Required    | ID  |
| DELETE Deletes Exercises Workout | /api/exercises/in_workout/:id   | Required    |Success Message|


## **Detailed Documentation**
### **<u>POST</u> Registration**
**End Point**: ``/api/auth/register``

**Requirements**:
    Email and Password
    
*Example of Return Body:*

Will return ID, email, and Token for immediate sign in.

    {
        "id": 1,
        "email": "user@email.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYnJvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRvaVgxcFBMZjBRTi5lY1dTdzRNeFl1ajBTcmsyeFdCRUQ1UXdEOTNvdlVGdXk1OWg1dkNmVyIsImlhdCI6MTU5MjkyODg3MCwiZXhwIjoxNTkzNTMzNjcwfQ.Bq9vCniHMW_uBNJzxsJf273j-lRfv-4KyNP59aPa1Bg",
    }
### **<u>POST</u> Login**
**End Point**: ``/api/auth/login``


**Requirements**:
    Email, Password
 

*Example of Return Body:*

    {
        "userId": 1,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYnJvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRvaVgxcFBMZjBRTi5lY1dTdzRNeFl1ajBTcmsyeFdCRUQ1UXdEOTNvdlVGdXk1OWg1dkNmVyIsImlhdCI6MTU5MjkyODg3MCwiZXhwIjoxNTkzNTMzNjcwfQ.Bq9vCniHMW_uBNJzxsJf273j-lRfv-4KyNP59aPa1Bg",
        "message": "logged in!"
    }

### **<u>GET</u> User by ID**
**End Point**: ``/api/auth/:id``

**!Important**: Include the ``ID`` of existing user for ``:id``.

 
*Example of Return Body:*

    {
        "message": "User Located!",
        "user": {
            "id": 1,
            "email": "user@email.com",
            "created_at": "2020-06-22 22:34:31",
            "updated_at": "2020-06-22 22:34:31",
            "workouts": [
            {
                "id": 1,
                "name": "Triceps",
                "exercises": 8
            },
            {
                "id": 2,
                "name": "Chest Day",
                "exercises": 0
            }
            ]
        }
    }

### **<u>GET</u> All Users**
**End Point**: ``/api/auth``
 
*Example of Return Body:*

Will return a list of Users form the database.

    {
        "message": "Users Located!",
        "users": [
            {
            "id": 1,
            "email": "user@email.com",
            "password": "$2a$10$oiX1pPLf0QN.ecWSw4MxYuj0Srk2xWBED5QwD93ovUFuy59h5vCfW",
            "created_at": "2020-06-22 22:34:31",
            "updated_at": "2020-06-22 22:34:31"
            }
        ]
    }

### **<u>GET</u> Workout By ID**
**End Point**: ``/api/workouts/single/:id``
 

**!Important**: Include the ``ID`` of existing workout for ``:id``.


*Example of Return Body:*

Will return a single workout from database.

    [
        {
            "id": 2,
            "name": "Chest Day",
            "date": "3/2/2020"
        }
    ]

### **<u>GET</u> List of Workouts for User**
**End Point**: ``/api/workouts/:id``
 

**!Important**: Include the ``ID`` of existing User for ``:id``.


*Example of Return Body:*

Will return a list of all workouts for a user.

    [
        {
            "id": 1,
            "name": "Triceps",
            "date": "3/12/2020"
        },
        {
            "id": 2,
            "name": "Chest Day",
            "date": "3/2/2020"
        }
    ]
### **<u>POST</u> Adds a Workout for User**
**End Point**: ``/api/workouts/:id``
 

**!Important**: Include the ``ID`` of existing User for ``:id``.
1. Cannot Repeat Existing Workout Name or ID


*SEND A JSON OBJECT:*
  {
    "name": "Upper",
    "date": "1/12/2020"
  }

*Example of Return Body:*

Will return the ID of newly created workout.

    [
        1
    ]

### **<u>PUT</u> Edits a Workout**
**End Point**: ``/api/workouts/:id``
 

**!Important**: Include the ``ID`` of existing Workout for ``:id``.
1. If the ID's or names don't match it will create a new workout in its place. 

*SEND A JSON OBJECT:*
  {
    "name": "Upper",
    "date": "1/12/2020"
  }


*Example of Return Body:*

    {
        "id": 4,
        "name": "Upper",
        "date": "1/12/2020"
    }

### **<u>DELETE</u> Deletes a Workout**
**End Point**: ``/api/workouts/:id``
 

**!Important**: Include the ``ID`` of existing Workout for ``:id``.

*Example of Return Body:*
Returns a Success Message

    {
        "message": "Successfully deleted 1"
    }

### **<u>GET</u> Gets List of Exercises Under a Workout**
**End Point**: ``/api/exercises/:id``
 

**!Important**: Include the ``ID`` of existing Workout for ``:id``.


*Example of Return Body:*

Will return a list of all exercises under a workout.

    {
        "data": {
            "workout_id": 3,
            "workout_name": "Leg Day",
            "exercises": [
            {
                "user_exercise_id": 14,
                "exercise_id": 6,
                "exercise_name": "Squat",
                "region": "Full-Body",
                "sets": 4,
                "reps": 5,
                "weight": 225
            }
            ]
        },
        "message": "Workout contains 1 exercises."
    }

### **<u>POST</u> Adds an Exercise to a Workout**
**End Point**: ``/api/exercises/:id``
 

**!Important**: Include the ``ID`` of existing Workout for ``:id``.

*SEND A JSON OBJECT:*

    {
        "name": "Leg Extension",
        "region": "Quads",
        "weight": 1,
        "sets": 4,
        "reps": 5
    }

*Example of Return Body:*

Will return a list of all exercises under a workout, including your new exercise.

    {
        "workout_id": 3,
        "workout_name": "Leg Day",
        "exercises": [
            {
            "user_exercise_id": 14,
            "exercise_id": 6,
            "exercise_name": "Squat",
            "region": "Full-Body",
            "sets": 4,
            "reps": 5,
            "weight": 225
            },
            {
            "user_exercise_id": 15,
            "exercise_id": 7,
            "exercise_name": "Lunges",
            "region": "Quads",
            "sets": 4,
            "reps": 5,
            "weight": 1
            },
            {
            "user_exercise_id": 17,
            "exercise_id": 9,
            "exercise_name": "Leg Extension",
            "region": "Quads",
            "sets": 4,
            "reps": 5,
            "weight": 1
            }
        ]
    }
### **<u>PUT</u> Updates an Exercise to a Workout**
**End Point**: ``/api/:exercise_id/exercises/:id``
 

**!Important**: 
1. Include the ``ID`` of existing Workout for ``:id``.
1. Include ``:exercise_id`` of existing exercise. 

*SEND A JSON OBJECT:*

    {
        "name": "Leg Extension",
        "region": "Quads",
        "weight": 1,
        "sets": 4,
        "reps": 5
    }

*Example of Return Body:*

Will return a list of all exercises under a workout, including your new exercise.

    {
        1
    }

### **<u>DELETE</u> Deletes an Exercise in a Workout**
**End Point**: ``/api/exercises/in_workout/:id ``
 

**!Important**: 
1. Include the ``user_exercise_id`` of existing Exercise for ``:id``.


*Example of Return Body:*

Will return a success message.

    {
        "message": "Successfully removed exercise."
    }




 