const express = require('express');
const cors = require('cors'); 
const school = require('../School.js');
const student = require('../Student.js');

const router = express.Router();
router.use(cors());