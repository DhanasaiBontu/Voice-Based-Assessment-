import mongoose from "mongoose";

const TestResultSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TaskRecord' },
  rollNo: { type: String, required: true },
  totalScore: { type: Number, required: true },
  scores: { type: Array, required: true },  // Stores question-wise scores, coherence, lda, t5, etc.
  submittedAt: { type: Date, default: Date.now }
});


const EvalMetrics = mongoose.model('EvalMetrics', TestResultSchema)
export default EvalMetrics;
