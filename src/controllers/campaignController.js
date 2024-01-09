/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const CampaignModel = require("../models/db/db");

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
  try {
    const data = req.body;
    const campaigns = {
      title: data.title,
      image: data.image,
      raisedAmount: data.raisedAmount,
      targetAmount: data.targetAmount,
    };

    let newCampaign;

    const existingCampaign = await CampaignModel.findOne({
      createdBy: data.createdBy,
    });

    if (existingCampaign) {
      const doesTitleExist = existingCampaign.campaigns.some(
        (campaign) => campaign.title === data.title
      );

      if (!doesTitleExist) {
        await CampaignModel.updateOne(
          { createdBy: data.createdBy },
          { $push: { campaigns: campaigns } }
        ).exec();

        newCampaign = await CampaignModel.findOne({
          createdBy: data.createdBy,
        });
      }
    } else {
      const filteredData = {
        createdBy: data.createdBy,
        campaigns: [campaigns],
      };

      newCampaign = new CampaignModel(filteredData);
      await newCampaign.save();
    }

    console.log("response:", newCampaign);

    res.setHeader("Content-Type", "application/json");

    res.status(200).json(newCampaign);
  } catch (err) {
    console.error("Failed to create new Campaign:", err);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed To Create", msg: err.message });
  }
};

module.exports = { getCampaignList, createCampaign };
