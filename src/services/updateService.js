const getError = require("./errorStore");

const { getCampaign } = require("./util/campaignUtil");

class UpdateService {
  constructor(_) {}

  async invoke(data) {
    const result = await this.updateCampaign(data);
    return result;
  }

  async _updateByRecordId(recordId, campaignId, campaignData) {
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
      await document.save();

      return document;
    } catch (error) {
      console.error("Error updating campaign:", error);
      return getError("updateByRecordId");
    }
  }

  async updateCampaign({ campaign: campaignData, campaignId, recordId }) {
    // ...
    if (recordId && campaignId) {
      return this._updateByRecordId(recordId, campaignId, campaignData);
    } else {
      return getError("updateCampaign");
    }
  }
}

module.exports = UpdateService;
