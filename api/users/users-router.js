const router = require('express').Router();

const Users = require('./users-model');
const { loggedIn } = require('../middleware/middleware');

router.get('/', loggedIn, (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch (err => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
