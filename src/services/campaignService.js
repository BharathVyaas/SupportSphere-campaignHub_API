const CreateService = require("./create");
const ReadService = require("./read");

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
    const res = await this.crud.invoke(data);
    return res;
  }
}

module.exports = CampaignService;

// Not Using Yet.
class ConcreteCommand {
  static #instance;

  static get instance() {
    if (!this.#instance) this.#instance = new ConcreteCommand();

    return this.#instance;
  }

  async invoke(x, data) {
    switch (x) {
      case "create": {
        const service = new CampaignService(new CreateService());
        const result = await service.invoke(data);
        return result;
      }
      case "read": {
        const service = new CampaignService(new ReadService());
        const result = await service.invoke(data);
        return result;
      }
    }
  }
}
