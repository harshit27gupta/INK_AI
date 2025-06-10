import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String, 
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema); 