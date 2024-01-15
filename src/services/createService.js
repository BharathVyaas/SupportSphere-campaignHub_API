// fundraisingMethod is added later

// Utility Imports
const { getDocument, doesTitleExist } = require("./util/campaignUtil");
const getError = require("./errorStore");

class CreateService {
  #CampaignModel;
  constructor(CampaignModel) {
    this.#CampaignModel = CampaignModel;
  }

  async invoke(data) {
    const result = await this.insertCampaign(data);
    return result;
  }

  /**
   * Inserts a campaign by id.
   * @param {string} recordId - The id of the campaign document.
   * @param {Object} campaign - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async _insertById(recordId, campaign) {
    try {
      const campaignDocument = await getDocument({ recordId });
      if (campaignDocument) {
        if (doesTitleExist(campaign.title, campaignDocument)) {
          return getError({ source: "insertById:doesTitleExist" });
        }

        campaignDocument.campaigns.push(campaign);
        await campaignDocument.save();

        return campaignDocument;
      }

      return getError({ source: "insertById:campaignDocument" });
    } catch (error) {
      console.error("Error inserting campaign by id:", error);
      return getError({ source: "insertById:caughtError", error });
    }
  }

  /**
   * Creates a new campaign document for a given createdBy.
   * @param {string} createdBy - The creator of the campaign document.
   * @param {string} fundraisingMethod - fundraiser method.
   * @returns {Object} The created campaign document.
   */
  async _createCampaign(createdBy, fundraisingMethod) {
    try {
      if (createdBy && fundraisingMethod) {
        const newCampaign = new this.#CampaignModel({
          createdBy,
          fundraisingMethod,
          campaigns: [],
        });

        const response = await newCampaign.save();

        console.log("====================================", response);
        return response;
      } else {
        return getError({ source: "createCampaign:creatdBy" });
      }
    } catch (error) {
      console.error("Error creating campaign document:", error);
      return getError({ source: "createCampaign:caughtError", error });
    }
  }

  /**
   * Inserts a campaign by name (createdBy).
   * @param {string} createdBy - The creator of the campaign.
   * @param {Object} campaigns - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async _insertByName(createdBy, fundraisingMethod, campaign) {
    try {
      let campaignDocument = await getDocument({
        createdBy,
        fundraisingMethod,
      });

      // If Document with the same creator doesn't exist, create a new Document.
      if (!campaignDocument || campaignDocument.source) {
        campaignDocument = await this._createCampaign(
          createdBy,
          fundraisingMethod,
          campaign
        );
      }

      if (doesTitleExist(campaign.title, campaignDocument)) {
        return getError({ source: "insertByName:doesTitleExist" });
      }

      campaignDocument.campaigns.push(campaign);
      await campaignDocument.save();

      return campaignDocument;
    } catch (error) {
      console.error("Error inserting campaign by name:", error);
      return getError({ source: "insertByName:caughtError", error });
    }
  }

  /**
   * Inserts a campaign based on either id or createdBy.
   * @param {Object} params - Parameters for insertion (id, createdBy).
   * @param {Object} campaign - The campaign data to insert.
   * @returns {Object} The result of the insertion.
   */
  async insertCampaign({ campaign, createdBy, fundraisingMethod, recordId }) {
    const document = await getDocument({
      recordId,
      createdBy,
      fundraisingMethod,
    });

    if (!document) {
      if (createdBy && fundraisingMethod)
        return await this._insertByName(createdBy, fundraisingMethod, campaign);
      return getError({ source: "insertCampaign:insertByName" });
    }

    if (recordId) {
      return this._insertById(recordId, campaign);
    } else if (createdBy && fundraisingMethod) {
      return this._insertByName(createdBy, fundraisingMethod, campaign);
    }
    throw new Error("createService:insertCampaign");
  }
}

module.exports = CreateService;
