import { Document, Schema, Types, model } from "mongoose";

interface iProject {
  projectName: string;
  createdAt: Date;
  deadline: string;
  tasks: Array<{}>;
  avatar: string;
}
interface iProjectData extends iProject, Document {}

const projectSchema = new Schema<iProjectData>({
  projectName: { type: String },
  deadline: { type: String },
  createdAt: { type: Date, default: Date.now },
  avatar: { type: String },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
});

export default model<iProjectData>("projecttask", projectSchema);
