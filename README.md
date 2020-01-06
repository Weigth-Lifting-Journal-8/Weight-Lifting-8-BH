# Weight-Lifting-8-BH

**API ROUTE**
*https://weight-lifting-8.herokuapp.com*

##END POINTS##

**Login Route .POST REQUEST**: /auth/login
    -- Login Route Requires an email and password
    -- Creates token, it will last an hour and require you to login again

**Registration Route .POST REQUEST**: /auth/register
 -- requires email, password, firstName, & lastName
 *_Example_*:
 ```
 {
     email: 'test@email.com', 
     password: 'password', 
     firstName: 'Paul', 
     lastName: 'Blart'
 }
 ```

 