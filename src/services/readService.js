const getError = require("./errorStore");

class ReadService {
  #CampaignModel;
  constructor(CampaignModel) {
    this.#CampaignModel = CampaignModel;
  }

  async invoke(data) {
    const result = this.getDocument(data);
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

  async getDocument({ fundraisingMethod }) {
    try {
      if (fundraisingMethod) {
        return await this._getCampaignByMethod(fundraisingMethod);
      }

      return await this._getCampaignDocument();
    } catch (err) {
      throw new Error("getDocument: Must be implimented", err);
    }
  }
}

module.exports = ReadService;
