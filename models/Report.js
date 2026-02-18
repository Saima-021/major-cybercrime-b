const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    fullName: String,
    mobile: String,
    email: String,
    address: String,
    govIdType: String,
    govIdNumber: String,

    isVictimSame: String,
    victimName: String,
    relationship: String,
    victimContact: String,

    crimeType: String,
    incidentDate: String,
    incidentTime: String,
    platformUsed: String,
    platformName: String,
    incidentDescription: String,

    proofFile: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
