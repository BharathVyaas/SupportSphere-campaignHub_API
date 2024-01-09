const CampaignModel = require("../models/db/db");
const getError = require("./errorStore");

/**
 * CampaignService class provides methods for interacting with the campaignHub_db.
 */
class CampaignService {
  // Singleton instance for CampaignService
  static campaignServiceInstance;
  static getInstance() {
    if (!this.campaignServiceInstance)
      this.campaignServiceInstance = new CampaignService();
    return this.campaignServiceInstance;
  }

  /**
   * Retrieves a campaign document by either id or createdBy.
   * @param {Object} params - Parameters for retrieval (id or createdBy).
   * @returns {Object} The campaign document.
   */
  async getDocument({ id, createdBy }) {
    try {
      if (id) {
        return await CampaignModel.findOne({ _id: id });
      }
      if (createdBy) {
        return await CampaignModel.findOne({ createdBy });
      }
    } catch (error) {
      console.error("Error getting campaign document:", error);
      return getError("getDocument", "Internal Server Error");
    }
  }

  /**
   * Checks if a title already exists in a given document's campaigns.
   */
  doesTitleExist(title, document) {
    return !!document.campaigns.find((element) => element.title === title);
  }

  /**
   * Inserts a campaign by id.
   * @param {string} id - The id of the campaign document.
   * @param {Object} campaign - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async insertById(id, campaign) {
    try {
      const campaignDocument = await this.getDocument({ id });
      if (campaignDocument) {
        if (this.doesTitleExist(campaign.title, campaignDocument)) {
          return getError("insertById", "Duplicate Object");
        }

        campaignDocument.campaigns.push(campaign);
        const updatedDocument = await campaignDocument.save();

        return {
          createdBy: campaignDocument.createdBy,
          lastInsertedCampaign: updatedDocument.campaigns.slice(-1)[0],
        };
      }

      return getError("insertById", "Invalid Id");
    } catch (error) {
      console.error("Error inserting campaign by id:", error);
      return getError("insertById", "Internal Server Error");
    }
  }

  /**
   * Creates a new campaign document for a given createdBy.
   * @param {string} createdBy - The creator of the campaign document.
   * @returns {Object} The created campaign document.
   */
  async createCampaign(createdBy) {
    try {
      if (createdBy) {
        const newCampaign = new CampaignModel({
          createdBy,
          campaigns: [],
        });

        const response = await newCampaign.save();
        return response;
      } else {
        return getError("createCampaign", "Empty Value");
      }
    } catch (error) {
      console.error("Error creating campaign document:", error);
      return getError("createCampaign", "Internal Server Error");
    }
  }

  /**
   * Inserts a campaign by name (createdBy).
   * @param {string} createdBy - The creator of the campaign.
   * @param {Object} campaigns - The campaign data to insert.
   * @returns {Object} An Object with createdBy and the last inserted campaign.
   */
  async insertByName(createdBy, campaigns) {
    try {
      let campaignDocument = await this.getDocument({ createdBy });
      // If Document with the same creator doesn't exist, create a new Document.
      if (!campaignDocument) {
        campaignDocument = await this.createCampaign(createdBy, campaigns);
      }

      if (this.doesTitleExist(campaigns.title, campaignDocument)) {
        return getError("insertByName", "Duplicate Object");
      }

      campaignDocument.campaigns.push(campaigns);
      const result = await campaignDocument.save();

      return {
        createdBy: campaignDocument.createdBy,
        lastInsertedCampaign: result.campaigns.slice(-1)[0],
      };
    } catch (error) {
      console.error("Error inserting campaign by name:", error);
      return getError("insertByName", "Internal Server Error");
    }
  }

  /**
   * Inserts a campaign based on either id or createdBy.
   * @param {Object} params - Parameters for insertion (id, createdBy).
   * @param {Object} campaigns - The campaign data to insert.
   * @returns {Object} The result of the insertion.
   */
  async insertCampaign({ campaigns, createdBy, id }) {
    const campaign = await this.getDocument({ id, createdBy });
    if (!campaign) {
      return getError("insertCampaign", "Invalid Value", id || createdBy);
    }

    if (id) {
      return this.insertById(id, campaigns);
    } else if (createdBy) {
      return this.insertByName(createdBy, campaigns);
    }
  }

  /**
   * Retrieves a campaign by either id or createdBy.
   * @param {Object} params - Parameters for retrieval (id or createdBy).
   * @returns {Object} An Object with the retrieved campaign data.
   */
  async getCampaign({ id, createdBy }) {
    try {
      if (!(id || createdBy)) {
        return getError("getCampaign", "Invalid Parameters");
      }

      if (id) {
        const response = await CampaignModel.findById(id);
        if (response) return response;
      } else if (createdBy) {
        const response = await CampaignModel.findOne({ createdBy });
        if (response) return response;
      }

      return getError("getCampaign", "Campaign Not Found");
    } catch (error) {
      console.error("Error retrieving campaign:", error);
      return getError("getCampaign", "Internal Server Error");
    }
  }

  /**
   * Retrieves all campaign documents.
   * @returns {Array} An array of campaign documents.
   */
  async getCampaignDocuments() {
    try {
      const documents = await CampaignModel.find({}).exec();
      return documents;
    } catch (error) {
      console.error("Error retrieving campaign documents:", error);
      return getError("getCampaignDocuments", "Internal Server Error");
    }
  }
}

module.exports = CampaignService;

/**
 * 
 * Previous insertCampaignCode
 * 
 * try {
    const campaigns = req.body;
    const campaigns = {
      title: campaigns.title,
      image: campaigns.image,
      raisedAmount: campaigns.raisedAmount,
      targetAmount: campaigns.targetAmount,
    };

    let newCampaign;

    const existingCampaign = await CampaignModel.findOne({
      createdBy: campaigns.createdBy,
    });

    if (existingCampaign) {
      const doesTitleExist = existingCampaign.campaigns.some(
        (campaign) => campaign.title === campaigns.title
      );

      if (!doesTitleExist) {
        await CampaignModel.updateOne(
          { createdBy: campaigns.createdBy },
          { $push: { campaigns: campaigns } }
        ).exec();

        newCampaign = await CampaignModel.findOne({
          createdBy: campaigns.createdBy,
        });
      }
    } else {
      const filteredcampaigns = {
        createdBy: campaigns.createdBy,
        campaigns: [campaigns],
      };

      newCampaign = new CampaignModel(filteredcampaigns);
      await newCampaign.save();
    }

    console.log("response:", newCampaign);

    res.setHeader("Content-Type", "application/json");

    res.status(200).json(newCampaign);
  } catch (err) {
    console.error("Failed to create new Campaign:", err);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed To Create", msg: err.message });
  }
  *
  *
  *
  *
  * 
  * // Workes on console - test for insertCampaign
  * 
  fetch('http://localhost:4001/campaign/campaign-create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    createdBy: 'Creater 0',
    title: 'great title',
    image: 'exampleImage.jpg',
    raisedAmount: 0,
    targetAmount: 1000,
  }),
})
  .then(response => response.json())
  .then(campaigns => console.log(campaigns))
  .catch(err => console.log(err));


 */
