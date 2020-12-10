const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/user/login', forwardAuthenticated, async(req, res) => res.render('login'));

// create
router.get('/create', ensureAuthenticated, (req, res) =>
  res.render('create', {
    user: req.user
  })
);

router.get('/bankquestion', ensureAuthenticated, (req, res) =>
  res.render('bankquestion', {
    user: req.user
  })
);

router.get('/create/quiz-creator', ensureAuthenticated, (req, res) =>
  res.render('quiz-creator', {
    user: req.user,
    id: req.id
  })
);

module.exports = router;
