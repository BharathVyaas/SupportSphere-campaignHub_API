/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const CampaignService = require("../services/campaignService");

const CreateService = require("../services/createService");
const ReadService = require("../services/readService");

const DUMMY_DATA = {
  createdBy: "the Creator",
  campaign: {
    title: "great title",
    image: "my_img.jpg",
    raisedAmount: 0,
    targetAmount: 100,
  },
};

// Controller for fetching the campaignhub document
const getCampaignListController = async (_, res) => {
  try {
    // Retrieve the campaign list from the database
    const campaignService = new CampaignService(ReadService);
    // Invoke method returns campainDocuments[]
    const campaignList = await campaignService.invoke(res.body);

    res.status(200).json(campaignList);
  } catch (err) {
    console.error("Error fetching campaign list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for creating a new campaign
const createCampaignController = async (_, res) => {
  try {
    // Insert a new campaign into database using the CreateService
    const campaignService = new CampaignService(CreateService);
    // Invoke method returns an object with createdBy and campaign{}
    const result = await campaignService.invoke(DUMMY_DATA);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCampaignListController, createCampaignController };
