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
   * @param {string} id - The id of the campaign document.
   * @param {Object} campaign - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async _insertById(id, campaign) {
    try {
      const campaignDocument = await getDocument({ id });
      if (campaignDocument) {
        if (doesTitleExist(campaign.title, campaignDocument)) {
          return getError("insertById", "Duplicate Object");
        }

        campaignDocument.campaigns.push(campaign);
        const updatedDocument = await campaignDocument.save();

        return {
          createdBy: campaignDocument.createdBy,
          lastInsertedCampaign: updatedDocument.campaigns.slice(-1)[0],
        };
      }

      return getError("insertById", "Invalid Id");
    } catch (error) {
      console.error("Error inserting campaign by id:", error);
      return getError("insertById", "Internal Server Error");
    }
  }

  /**
   * Creates a new campaign document for a given createdBy.
   * @param {string} createdBy - The creator of the campaign document.
   * @returns {Object} The created campaign document.
   */
  async _createCampaign(createdBy) {
    try {
      if (createdBy) {
        const newCampaign = new this.#CampaignModel({
          createdBy,
          campaigns: [],
        });

        const response = await newCampaign.save();
        return response;
      } else {
        return getError("createCampaign", "Empty Value");
      }
    } catch (error) {
      console.error("Error creating campaign document:", error);
      return getError("createCampaign", "Internal Server Error");
    }
  }

  /**
   * Inserts a campaign by name (createdBy).
   * @param {string} createdBy - The creator of the campaign.
   * @param {Object} campaigns - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async _insertByName(createdBy, campaign) {
    try {
      let campaignDocument = await getDocument({ createdBy });
      // If Document with the same creator doesn't exist, create a new Document.
      if (!campaignDocument) {
        campaignDocument = await this._createCampaign(createdBy, campaign);
      }
      console.log(campaign.title);
      if (doesTitleExist(campaign.title, campaignDocument)) {
        return getError("insertByName", "Duplicate Object");
      }

      campaignDocument.campaigns.push(campaign);
      const result = await campaignDocument.save();

      return {
        createdBy: campaignDocument.createdBy,
        lastInsertedCampaign: result.campaigns.slice(-1)[0],
      };
    } catch (error) {
      console.error("Error inserting campaign by name:", error);
      return getError("insertByName", "Internal Server Error");
    }
  }

  /**
   * Inserts a campaign based on either id or createdBy.
   * @param {Object} params - Parameters for insertion (id, createdBy).
   * @param {Object} campaign - The campaign data to insert.
   * @returns {Object} The result of the insertion.
   */
  async insertCampaign({ campaign, createdBy, id }) {
    const document = await getDocument({ id, createdBy });

    if (!document) {
      if (createdBy) return await this._insertByName(createdBy, campaign);
      return getError("insertCampaign", "Invalid Value", id || createdBy);
    }

    if (id) {
      return this._insertById(id, campaign);
    } else if (createdBy) {
      return this._insertByName(createdBy, campaign);
    }
  }
}

module.exports = CreateService;
