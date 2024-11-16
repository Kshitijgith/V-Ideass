const express = require('express');
const router = express.Router();
const { Showgroups, IDgroups,searchGroups } = require('../controllers/fetchgroupcontroller');
const {FindTeacher,TeacherName,FindProjects}=require('../controllers/fetchteachers')
router.post('/Find-Teacher',FindTeacher);
router.post('/Teacher',TeacherName);
router.post('/Find-Projects',FindProjects)
router.post('/Search-Groups',searchGroups)
router.post('/all-groups',Showgroups);
router.post('/Id',IDgroups)
module.exports = router;