const express = require('express');
const router = express.Router();
const { Showgroups, IDgroups } = require('../controllers/fetchgroupcontroller');
router.post('/all-groups',Showgroups);
router.post('/Id',IDgroups)
module.exports = router;