// fundraisingMethod property is added after level 1

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

  async _deleteDocument(createdBy, fundraisingMethod) {
    try {
      const result = await this.#campaignModel.findOneAndDelete({
        createdBy,
        fundraisingMethod,
      });

      return result;
    } catch (error) {
      console.error("Error deleting decument:", error);
      return getError({ source: "deleteDocument:caughtError", error });
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
      return getError({ source: "deleteCampaignById:caughtError", error });
    }
  }

  // Created After level 1
  async _deleteFundraisingMethod(fundraisingMethod) {
    try {
      const list = await this.#campaignModel.find({
        fundraisingMethod,
      });

      list.map(async (method) => {
        await this.#campaignModel.findOneAndDelete({
          _id: method._id,
        });
      });

      return list;
    } catch (err) {
      console.error("Must Add Error Handling For _deleteFundraisingMethod");
      throw new Error("_deleteFundraisingMethod(fundraisingMethod)", err);
    }
  }

  async deleteCampaign({ recordId, createdBy, fundraisingMethod, campaignId }) {
    if (createdBy && fundraisingMethod && !campaignId) {
      return await this._deleteDocument(createdBy, fundraisingMethod);
    }

    if (recordId && campaignId) {
      const result = await this._deleteCampaignById(recordId, campaignId);
      return result;
    }

    if (fundraisingMethod) {
      const result = await this._deleteFundraisingMethod(fundraisingMethod);
      return result;
    }
    return getError({ source: "deleteCampaign:campaignId" });
  }
}

module.exports = DeleteService;
