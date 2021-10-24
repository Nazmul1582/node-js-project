const express = require('express');
const router = express.Router();

const {
    register,
    getAll,
    getById,
    login
} = require('../controller/student');

router.post('/register', register);
router.get('/all-student', getAll);
router.get('/find-student/:id', getById)
router.post('/login', login);

module.exports = router;