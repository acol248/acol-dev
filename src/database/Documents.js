import { Schema, model } from "mongoose";

const documentSchema = new Schema({
  name: String,
});

const Document = model("Document", documentSchema);

export default Document;
