const CampaignModel = require("../models/db/db");

const ReadService = require("./readService");
const CreateService = require("./createService");
const UpdateService = require("./updateService");
const DeleteService = require("./deleteService");

/**
 *
 * CampaignService class provides methods for interacting with the
 * campaignhub_db.
 */
class CampaignService {
  constructor(crud) {
    this.crud = crud;
  }

  async invoke(data) {
    const result = await this.crud.invoke(data);
    return result;
  }
}

// To make coder more Readable

class ConcreteCommand {
  static #instance;

  static get instance() {
    if (!this.#instance) this.#instance = new ConcreteCommand();

    return this.#instance;
  }

  async command(x, data) {
    switch (x) {
      case "create": {
        const service = new CampaignService(new CreateService(CampaignModel));
        const result = await service.invoke(data);
        return result;
      }
      case "read": {
        const service = new CampaignService(new ReadService(CampaignModel));
        const result = await service.invoke(data);
        return result;
      }
      case "update": {
        const service = new CampaignService(new UpdateService(CampaignModel));
        const result = await service.invoke(data);
        return result;
      }
      case "delete": {
        const service = new CampaignService(new DeleteService(CampaignModel));
        const result = await service.invoke(data);
        return result;
      }
      default: {
        console.error("Invalid Operation serviceInstance");
        return result;
      }
    }
  }
}

module.exports = { CampaignService, ConcreteCommand };
