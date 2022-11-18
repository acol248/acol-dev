import mongoose from "mongoose";

const Document = new mongoose.Schema({
  name: String,
}, { collection: 'documents' });

module.exports =
  mongoose.models.Document || mongoose.model("Document", Document, 'documents');
