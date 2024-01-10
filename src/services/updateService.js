const { getDocument, getCampaign } = require("./util/campaignUtil");

class UpdateService {
  #CampaignModel;
  constructor(CampaignModel) {
    this.#CampaignModel = CampaignModel;
  }

  async invoke(data) {
    const result = await this.updateCampaign(data);
    return result;
  }

  async updateByRecordId(recordId, campaignId, campaignData) {
    try {
      const { campaignToUpdate, document } = await getCampaign(
        recordId,
        campaignId
      );

      for (const prop in campaignData) {
        if (campaignData.hasOwnProperty(prop)) {
          campaignToUpdate[prop] = campaignData[prop];
        }
      }
      const result = await document.save();

      return result;
    } catch (error) {
      console.error("Error updating campaign:", error);
      return {
        type: "updateByRecordId",
        err: "Internal Server Error",
        msg: "Error updating campaign document",
      };
    }
  }

  async updateCampaign({ campaign: campaignData, campaignId, recordId }) {
    if (recordId && campaignId) {
      return this.updateByRecordId(recordId, campaignId, campaignData);
    } else {
      return {
        type: "updateCampaign",
        error: "Not Enough Data",
        msg: "required both recordId and campaignId to update a campaign",
      };
    }
  }
}

module.exports = UpdateService;
