import { Document, Schema, model } from "mongoose";

interface iTodo {
  name: string;
  description: string;
  completed: boolean;
  AssignEmail: string;
}
interface iTodoData extends iTodo, Document {}

const taskSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  AssignEmail: { type: String },
  completed: { type: Boolean, default: false },
  deadline: { type: Date },
  status: { type: String, default: "Open" },
  project: { type: Schema.Types.ObjectId, ref: "Projects" },
});

export default model<iTodoData>("taskproject", taskSchema);
