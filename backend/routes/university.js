const express = require('express');
const { addUniversity, getAlluniversity, getTheUniversity } = require('../controllers/university');
const router = express.Router();

router.post('/addUniv',addUniversity);
router.get('/univ',getAlluniversity)
router.post('/univsearch',getTheUniversity)

module.exports = router;