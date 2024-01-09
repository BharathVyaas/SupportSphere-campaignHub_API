/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const CampaignService = require("../services/campaignService");
const campaignService = CampaignService.getInstance();

// Controller for fetching the campaignhub document
const getCampaignListController = async (_, res) => {
  try {
    // Retrieve the campaign list from the database
    const campaignList = await campaignService.getCampaignDocument();
    res.status(200).json(campaignList);
  } catch (err) {
    console.error("Error fetching campaign list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for creating a new campaign
const createCampaignController = async (req, res) => {
  try {
    // Insert a new campaign into database using the CampaignService
    const result = await campaignService.insertCampaign({
      createdBy: "creator 0",
      campaigns: {
        title: "great title 0",
        image: "my_img.jpg",
        raisedAmount: 0,
        targetAmount: 100,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCampaignListController, createCampaignController };
