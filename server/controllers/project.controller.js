// projects

// Methods Urls Actions
// GET api/projects get all projects
// GET api/projects/:id get projects by id
// POST api/projects add new project
// PUT api/projects/:id update project by id
// DELETE api/projects/:id remove project by id
// DELETE api/projects remove all projects

import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    const project = new Project(req.body)
    try {
        await project.save()
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
        let projects = await Project.find().select('title firstname lastname email completion description')
        res.json(projects)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const projectByID = async (req, res, next, id) => {
    try {
        let project = await Project.findById(id)
        if (!project)
            return res.status(400).json({
                error: "Project not found"
            })
        req.project = project
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve project"
        })
    }
}

const read = (req, res) => {
    return res.json(req.project)
}

const updateById = async (req, res) => {
    try {
        let project = req.project
        project = extend(project, req.body)
        project.updated = Date.now()
        await project.save()
        res.json(project)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const removeById = async (req, res) => {
    try {
        let project = req.project
        let deletedProject = await project.deleteOne()
        res.json(deletedProject)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const removeAll = async (req, res) => {
    try {
        let deletedProjects = await Project.deleteMany({})
        res.json(deletedProjects)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default { create, list, projectByID, read, updateById, removeById, removeAll }