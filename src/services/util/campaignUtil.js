const getError = require("../errorStore");

const CampaignModel = require("../../models/db/db");

/**
 * Retrieves a campaign document by either id or createdBy.
 * @returns {Object} The campaign document.
 */
async function getDocument({ recordId, createdBy, fundraisingMethod }) {
  try {
    if (recordId) {
      return await CampaignModel.findOne({ _id: recordId });
    }

    if (createdBy && fundraisingMethod) {
      return await CampaignModel.findOne({ createdBy, fundraisingMethod });
    }
  } catch (error) {
    console.error("Error getting campaign document:", error);
    return getError({ source: "getDocument:caughtError", error });
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
  console.log(document);
  return document.campaigns.find((element) => element.title === title);
}

module.exports = { getDocument, doesTitleExist, getCampaign };
