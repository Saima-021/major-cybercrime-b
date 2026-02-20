const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  reportType: { type: String, required: true },
  incidentDate: { type: String, required: true },
  incidentTime: { type: String, required: true },
  description: { type: String, required: true },
  platform: { type: String, required: true },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true },
  
  // 🔥 CHANGE THIS: Wrap string in brackets to make it an array
  proof: [{ type: String }], 
  
  status: { type: String, default: "Pending" } 
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);