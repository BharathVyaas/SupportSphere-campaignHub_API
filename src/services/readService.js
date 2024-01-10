const getError = require("./errorStore");

class ReadService {
  #CampaignModel;
  constructor(CampaignModel) {
    this.#CampaignModel = CampaignModel;
  }

  async invoke(_) {
    const result = this._getCampaignDocument();
    return result;
  }

  /**
   *
   * Retrieves all campaign documents.
   * @returns {Array} An array of campaign documents.
   */
  async _getCampaignDocument() {
    try {
      const documents = await this.#CampaignModel.find({}).exec();
      return documents;
    } catch (error) {
      console.error("Error retrieving campaign documents:", error);
      return getError({ source: "getCampaignDocument:caughtError", error });
    }
  }
}

module.exports = ReadService;
