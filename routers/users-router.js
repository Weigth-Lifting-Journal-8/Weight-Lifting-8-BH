const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/auth-model.js');

// Requires 4 fields: email, password, firstName, lastName
router.post('/register', async (req, res) => {
  // implement registration
  let user = req.body;

  const email = await Users.findByEmail(user.email)

  if (email){
    console.log("this is the email", email)
    res.status(400).json({ message: 'That email is already taken.'})
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    Users.addUser(user)
      .then(user => {
        res.status(201).json({
            id: user.id,
            email: user.email,
            password: user.password
        })
      })
      .catch(err => {
        res.status(400).json({ Error: `Bad request: ${err}`});
      });
   }
});

// LOGIN IMPLEMENTATION --> Returns Token
router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findByEmail(email)
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = makeToken(user);

        const userId = user.id;

        res.status(200).json({ userId, token, message: 'logged in!' })
      } else {
        res.status(401).json({ message: 'Failed to log you in.' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GETS User By Id
router.get('/:id', async (req, res) => {
  let { id } = req.params;

  const user = await Users.getUserById(id)

  if(user){
    return res.status(200).json({ message: "User Located!", user})
  } else {
    return res.status(500).json({ message: "There is no user by that id."})
  }
})

// GETS All Users
router.get('/', (req, res) => {
  Users.getAll()
     .then(users => res.status(200).json({ message: "Users Located!", users}))
     .catch(err => res.status(500).json({ message: "Trouble getting all users.", err}))
})

function makeToken(user){
  const payload = {
    email: user.email,
    password: user.password,
  }
  const secret = process.env.JWT_SECRET || "Lift";

  const options = {
    expiresIn: "7d"
  }
  return jwt.sign(payload, secret, options);
}


module.exports = router;