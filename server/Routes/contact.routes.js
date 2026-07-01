// Methods Urls Actions
// GET api/contacts get all contacts
// GET api/contacts/:id get contacts by id
// POST api/contacts add new contact
// PUT api/contacts/:id update contact by id
// DELETE api/contacts/:id remove contact by id
// DELETE api/contacts remove all contacts

import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
const router = express.Router()

router.route('/api/contacts').post(contactCtrl.create)
router.route('/api/contacts').get(contactCtrl.list)
router.param('contactId', contactCtrl.contactByID)
router.route('/api/contacts/:contactId').get(contactCtrl.read)
router.route('/api/contacts/:contactId').put(contactCtrl.update)
router.route('/api/contacts/:contactId').delete(contactCtrl.remove)
router.route('/api/contacts').delete(contactCtrl.removeAll)

export default router