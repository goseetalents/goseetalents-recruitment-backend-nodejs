import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    trim: true
  },
  notes : {
    type: String,
    trim: true
  },
  notinttech : {
    type: String,
    trim: true
  },
  reminder : {
    type: String,
    trim: true
  },
  tipper : {
    type: String,
    trim: true
  },
  whynotint : {
    type: String,
    trim: true
  }
});

export default mongoose.model('Applicant', ApplicantSchema);
