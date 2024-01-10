/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const { ConcreteCommand } = require("../services/campaignService");
// Using this approach to make code lean and more readable
const serviceInstance = ConcreteCommand.instance;

const DUMMY_DATA = {
  recordId: "659e027972d8a3099a0b067e",
  campaign: {
    title: "great title 6",
    image: "my_img.jpg",
    raisedAmount: 0,
    targetAmount: 100,
  },
};

const DUMMY_EDIT = {
  recordId: "659e027972d8a3099a0b067e",
  campaignId: "659e0dbd96bdb67873085529",
  campaign: {
    title: "updated title again",
    image: "my_beautiful_img.jpg",
    raisedAmount: 0,
    targetAmount: 100,
  },
};

/**
 *
 *  READ
 */

// Controller for fetching the campaignhub document
const getCampaignListController = async (_, res) => {
  try {
    // Returns campaignhub_db/campaigns document
    const campaignList = await serviceInstance.command("read", res.body);

    res.status(200).json(campaignList);
  } catch (err) {
    console.error("Error fetching campaign list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *
 *  CREATE
 */

// Controller for creating a new campaign
const createCampaignController = async (_, res) => {
  try {
    // Require _id or createdBy to get a Document
    // Returns a document with _id:string createdBy:string campaigns[]
    const result = await serviceInstance.command("create", DUMMY_DATA);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *
 *  UPDATE
 */
const editCampaignController = async (_, res) => {
  try {
    const result = await serviceInstance.command("update", DUMMY_EDIT);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error updating campaign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCampaignListController,
  createCampaignController,
  editCampaignController,
};
