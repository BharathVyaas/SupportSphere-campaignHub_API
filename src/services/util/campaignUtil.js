const getError = require("../errorStore");
const CampaignModel = require("../../models/db/db");

/**
 * Retrieves a campaign document by either id or createdBy.
 * @returns {Object} The campaign document.
 */
async function getDocument({ recordId, createdBy }) {
  try {
    if (recordId) {
      return await CampaignModel.findOne({ _id: recordId });
    }
    if (createdBy) {
      return await CampaignModel.findOne({ createdBy });
    }
  } catch (error) {
    console.error("Error getting campaign document:", error);
    return getError("getDocument", "Internal Server Error");
  }
}

async function getCampaign(recordId, campaignId) {
  const document = await getDocument({ recordId });

  if (!document) {
    return {
      type: "updateByRecordId",
      err: "Document Not Found",
      msg: "Couldn't find document with provided recordId",
    };
  }

  const campaignToUpdate = document.campaigns.find(
    (campaign) => campaign._id.toString() === campaignId
  );

  if (!campaignToUpdate) {
    return {
      type: "updateByRecordId",
      err: "Campaign Not Found",
      msg: "Couldn't find campaign with provided campaignId",
    };
  }

  return { document, campaignToUpdate };
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
async function getRecord({ recordId, createdBy }) {
  try {
    if (!(recordId || createdBy)) {
      return getError("getCampaign", "Invalid Parameters");
    }

    if (recordId) {
      const response = await CampaignModel.findById(recordId);
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
