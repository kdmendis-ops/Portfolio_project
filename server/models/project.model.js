// projects
// The fields are as follows
// Field Data type
// title string
// firstname string
// lastname string
// email string
// completion Date
// description string

import mongoose from 'mongoose'

// Mongoose schema describing one portfolio project, with a completion
// date and free-text description.
const ProjectSchema = new mongoose.Schema({
   title: {
      type: String,
      trim: true,
      required: 'Title is required'
   },
   firstname: {
      type: String,
      trim: true,
      required: 'First name is required'
   },
   lastname: {
      type: String,
      trim: true,
      required: 'Last name is required'
   },
   email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required'
   },
   completion: {
      type: Date,
      default: Date.now
   },
   description: {
      type: String,
      trim: true
   }
})
export default mongoose.model('Project', ProjectSchema)