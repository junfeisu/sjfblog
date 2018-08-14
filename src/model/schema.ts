import mongoose from 'mongoose'
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
   type: String, 
   required: true 
  },
  create_date: { 
    type: String, 
    required: true
  },
  content: { 
    type: String, 
    required: true 
  },
  author: String,
  tags: { 
    type: [String], 
    required: true 
  }
}, { versionKey: false })

export default mongoose.model('blog', blogSchema)
