// education.routes.js defines the CRUD API for education/qualification entries.
// Methods Urls Actions
// GET api/qualifications get all qualifications
// GET api/qualifications/:id get qualifications by id
// POST api/qualifications add new qualification
// PUT api/qualifications/:id update qualification by id
// DELETE api/qualifications/:id remove qualification by id
// DELETE api/qualifications remove all qualifications

import express from 'express'
import educationCtrl from '../controllers/education.controller.js'
const router = express.Router()

router.route('/api/qualifications').post(educationCtrl.create)
router.route('/api/qualifications').get(educationCtrl.list)
// Runs before any :qualificationId route to fetch that record once and attach it to req.
router.param('qualificationId', educationCtrl.educationByID)
router.route('/api/qualifications/:qualificationId').get(educationCtrl.read)
router.route('/api/qualifications/:qualificationId').put(educationCtrl.updateById)
router.route('/api/qualifications/:qualificationId').delete(educationCtrl.removeById)
router.route('/api/qualifications').delete(educationCtrl.removeAll)

export default router