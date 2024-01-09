const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/campaignhub_db")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
  },
  raisedAmount: {
    type: Number,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
});

// One To Many relationship
const CampaignRecordSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    unique: true,
  },
  campaigns: { type: [CampaignSchema], required: true },
});

// For faster lookup time when querying using user profile
CampaignRecordSchema.index({ createdBy: 1 });

// Campaign model
const CampaignModel = mongoose.model("Campaign", CampaignRecordSchema);

module.exports = CampaignModel;
