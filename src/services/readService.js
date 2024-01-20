const getError = require("./errorStore");

class ReadService {
  #CampaignModel;
  constructor(CampaignModel) {
    this.#CampaignModel = CampaignModel;
  }

  async invoke(data) {
    const result = this.getDocument(data);
    console.log("invoke:", data);
    return result;
  }

  async _getCampaignByMethod(fundraisingMethod) {
    try {
      if (fundraisingMethod) {
        const result = await this.#CampaignModel.find({ fundraisingMethod });

        return result;
      }
    } catch (err) {
      console.error("_getCampaignByMethod({fundraisingMethod})");
      throw new Error("_getCampaignByMethod({fundraisingMethod})");
    }
  }

  /**
   *
   * Retrieves all campaign documents.
   * @returns {Array} An array of campaign documents.
   */
  async _getCampaignDocument(_) {
    try {
      const documents = await this.#CampaignModel.find({}).exec();
      return documents;
    } catch (error) {
      console.error("Error retrieving campaign documents:", error);
      return getError({ source: "getCampaignDocument:caughtError", error });
    }
  }

  // fundraisingMehod should be in camelCase
  async getDocument(data) {
    try {
      const fundraisingMethod = data.method;
      if (fundraisingMethod) {
        return await this._getCampaignByMethod(fundraisingMethod);
      }
      console.log("getDocument:", fundraisingMethod);
      return await this._getCampaignDocument();
    } catch (err) {
      throw new Error("getDocument: Must be implimented", err);
    }
  }
}

module.exports = ReadService;
