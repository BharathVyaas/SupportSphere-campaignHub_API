const CampaignModel = require("../models/db/db");

/**
 *
 * CampaignService class provides methods for interacting with the
 * campaignhub_db.
 */
class CampaignService {
  constructor(crud) {
    this.crud = new crud(CampaignModel);
  }

  async invoke(data) {
    const result = await this.crud.invoke(data);
    return result;
  }
}

module.exports = CampaignService;
