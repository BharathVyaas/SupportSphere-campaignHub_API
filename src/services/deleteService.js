const getError = require("./errorStore");

class DeleteService {
  #campaignModel;
  constructor(campaignModel) {
    this.#campaignModel = campaignModel;
  }

  async invoke(data) {
    const result = await this.deleteCampaign(data);
    return result;
  }

  async _deleteDocument(createdBy) {
    try {
      const result = await this.#campaignModel.findOneAndDelete({ createdBy });

      return result;
    } catch (error) {
      console.error("Error deleting decument:", error);
      return getError({ source: "deleteDocument:caughtError" });
    }
  }

  async _deleteCampaignById(recordId, campaignId) {
    try {
      const result = await this.#campaignModel.findOneAndUpdate(
        { _id: recordId },
        { $pull: { campaigns: { _id: campaignId } } },
        { new: true }
      );

      console.log("result:", result, "end");

      return result;
    } catch (error) {
      console.error("Error deleting campaign:", error);
      return getError({ source: "deleteCampaignById:caughtError" });
    }
  }

  async deleteCampaign({ recordId, createdBy, campaignId }) {
    if (createdBy && !campaignId) {
      return await this._deleteDocument(createdBy);
    }

    if (recordId && campaignId) {
      const result = await this._deleteCampaignById(recordId, campaignId);
      return result;
    }
    return getError({ source: "deleteCampaign:campaignId" });
  }
}

module.exports = DeleteService;
