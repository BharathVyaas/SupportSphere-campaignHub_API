/**
 * TODO:-
 *   Need To Make res.json Error Messages More Generic According To Client.
 */

//
const { ConcreteCommand } = require("../services/campaignService");
// Using this approach to make code lean and more readable
const serviceInstance = ConcreteCommand.instance;

const DUMMY_DATA = {
  createdBy: "creator",
  campaign: {
    title: "great title 9",
    image: "my_img.jpg",
    raisedAmount: 0,
    targetAmount: 100,
  },
};

const DUMMY_EDIT = {
  recordId: "659e5853cd8f0d091ca3a66e",
  campaignId: "659e5860bbce80ddfa06bb27",
  campaign: {
    title: "updated title",
    image: "beautiful_img.jpg",
    raisedAmount: 0,
    targetAmount: 100,
  },
};

const DUMMY_DELETE = {
  recordId: "659e5853cd8f0d091ca3a66e",
  campaignId: "659e5860bbce80ddfa06bb27",
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
    // Returns updated Record
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
    // Returns updated record
    const result = await serviceInstance.command("update", DUMMY_EDIT);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error updating campaign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *
 *  DELETE
 */
const deleteCampaignController = async (_, res) => {
  try {
    // Requires createdBy to delete all campaigns created by that user
    // Requires recordId and campaignId to delete one campaign
    // Returns updated record
    const result = await serviceInstance.command("delete", DUMMY_DELETE);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error deleting campaign or record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCampaignListController,
  createCampaignController,
  editCampaignController,
  deleteCampaignController,
};
