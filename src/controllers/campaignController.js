/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const CampaignModel = require("../models/db/db");
const CampaignService = require("../services/campaignService");

const getCampaignList = async (_, res) => {
  try {
    const campaignList = await CampaignModel.find({}).exec();
    res.status(200).json(campaignList);
  } catch (err) {
    console.error("Error fetching campaign list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCampaign = async (req, res) => {
  const campaign = new CampaignService();
  const resp = await campaign.insertCampaign({
    createdBy: "creator 0",
    campaigns: {
      title: "greate title 0",
      image: "my_img.jpg",
      raisedAmount: 0,
      targetAmount: 100,
    },
  });
  console.log(resp);
};

module.exports = { getCampaignList, createCampaign };
