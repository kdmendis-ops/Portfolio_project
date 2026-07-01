// Methods Urls Actions
// GET api/projects get all projects
// GET api/projects/:id get projects by id
// POST api/projects add new project
// PUT api/projects/:id update project by id
// DELETE api/projects/:id remove project by id
// DELETE api/projects remove all projects

import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
const router = express.Router()

router.route('/api/projects').post(projectCtrl.create)
router.route('/api/projects').get(projectCtrl.list)
router.param('projectId', projectCtrl.projectByID)
router.route('/api/projects/:projectId').get(projectCtrl.read)
router.route('/api/projects/:projectId').put(projectCtrl.updateById)
router.route('/api/projects/:projectId').delete(projectCtrl.removeById)
router.route('/api/projects').delete(projectCtrl.removeAll)

export default router