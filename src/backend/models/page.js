import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft',
  },
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
