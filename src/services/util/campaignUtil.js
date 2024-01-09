const getError = require("../errorStore");
const CampaignModel = require("../../models/db/db");

/**
 * Retrieves a campaign document by either id or createdBy.
 * @returns {Object} The campaign document.
 */
async function getDocument({ id, createdBy }) {
  try {
    if (id) {
      return await CampaignModel.findOne({ _id: id });
    }
    if (createdBy) {
      return await CampaignModel.findOne({ createdBy });
    }
  } catch (error) {
    console.error("Error getting campaign document:", error);
    return getError("getDocument", "Internal Server Error");
  }
}

/**
 * Checks if a title already exists in a given document's campaigns.
 */
function doesTitleExist(title, document) {
  return document.campaigns.find((element) => element.title === title);
}

/**
 * Retrieves a campaign by either id or createdBy.
 * @returns {Object} An Object with the retrieved campaign data.
 */
async function getCampaign({ id, createdBy }) {
  try {
    if (!(id || createdBy)) {
      return getError("getCampaign", "Invalid Parameters");
    }

    if (id) {
      const response = await CampaignModel.findById(id);
      if (response) return response;
    } else if (createdBy) {
      const response = await CampaignModel.findOne({ createdBy });
      if (response) return response;
    }

    return getError("getCampaign", "Campaign Not Found");
  } catch (error) {
    console.error("Error retrieving campaign:", error);
    return getError("getCampaign", "Internal Server Error");
  }
}

module.exports = { getDocument, doesTitleExist, getCampaign };
