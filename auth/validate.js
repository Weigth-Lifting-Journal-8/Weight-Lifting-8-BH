const UserModel = require('../models/user-model.js');
// MIDDLEWARE FOR VALIDATING USER ID ------>>>> MAY NOT NEED
function validateUserId(req, res, next) {
    const id = req.params.userId;
 
    UserModel.getUserById(id)
       .then(user => {
          if (!user) {
             res.status(404).json({ message: 'There is no such user by that id' });
          } else {
             next();
          }
       });
 };

 module.exports = validateUserId;