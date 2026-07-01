import Education from '../models/education.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Methods Urls Actions
// GET api/qualifications get all qualifications
// GET api/qualifications/:id get qualifications by id
// POST api/qualifications add new qualification
// PUT api/qualifications/:id update qualification by id
// DELETE api/qualifications/:id remove qualification by id
// DELETE api/qualifications remove all qualifications

const create = async (req, res) => {
    const education = new Education(req.body)
    try {
        await education.save()
        return res.status(200).json({
            message: "Successfully created!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        let educations = await Education.find().select('title firstname lastname email completion description')
        res.json(educations)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const educationByID = async (req, res, next, id) => {
    try {
        let education = await Education.findById(id)
        if (!education)
            return res.status(400).json({
                error: "Education not found"
            })
        req.education = education
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve education"
        })
    }
}

const read = (req, res) => {
    return res.json(req.education)
}

const updateById = async (req, res) => {
    try {
        let education = req.education
        education = extend(education, req.body)
        education.updated = Date.now()
        await education.save()
        res.json(education)

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeById = async (req, res) => {
    try {
        let education = req.education
        let deletedEducation = await education.deleteOne()
        res.json(deletedEducation)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        let deletedEducations = await Education.deleteMany({})
        res.json(deletedEducations)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    list,
    educationByID,
    read,
    updateById,
    removeById,
    removeAll
}