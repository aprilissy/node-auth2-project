const router = require('express').Router();
const bcryptjs = require('bcryptjs');

const Users = require('../users/users-model');
const { isValid, newToken } = require('../middleware/middleware');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if(isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      });
  } else {
    res.status(400).json({ message: `please provide username and password. The password should be a combination of letters and numbers` });
  }
});

router.post('/login', (req, res) => { 
// On successful login, create a new JWT with the user id as the subject and send it back to the client.
  const {username, password} = req.body;
  if(isValid(req.body)) {
    Users.getBy({ username:username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = newToken(user);
          res.status(200).json({
            message:`Welcome ${user.username}`,
            token
          });
        } else {
          res.status(401).json({ message: `You shall not pass!` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: `You shall not pass!` });
  }

});

module.exports = router;
