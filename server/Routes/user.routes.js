// user.routes.js defines the CRUD API for user accounts:
// create, list, read one, update, and delete, all under /api/users.
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
const router = express.Router()

router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
// router.param runs before any route with a :userId segment, so the
// requested user is looked up and attached to req once, instead of
// repeating that lookup in read/update/remove below.
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)

export default router
