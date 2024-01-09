const CampaignModel = require("../models/db/db");

class CampaignService {
  getError(from, ...rest) {
    // This messages are for testing purpouse. will be changed later
    switch (from) {
      case "insertCampaign":
        return {
          type: "insertCampaign",
          error: "returned 0 elements",
          msg: "coudn't find element with identifer " + rest[0],
        };
      case "getCampaign":
        return {
          type: "getCampaign",
          error: "identifier is empty",
          msg: "must pass id or createdBy",
        };
      case "insertById":
        return {
          type: "insertByID",
          err: "Title already exists | createdBy value is empty",
          msg: "Trying to create a duplicate object | Didn't provide createdBy",
        };
      case "createCampaign":
        return {
          type: "createCampaign",
          error: "invalid field",
          msg: "createdBy value is empty",
        };
      case "getCampaign":
        return {
          type: "getCampaign",
          error: "invalid field",
          msg: "provided filed must be invalid",
        };

      case "insertByName":
        return {
          type: "insertByName",
          error: "duplicate Name",
          msg: "Trying to create a duplicate title",
        };
    }
  }

  async getDocument({ id, createdBy }) {
    let campaignDocument;
    if (id) {
      campaignDocument = await CampaignModel.findOne({ _id: id });
    }
    if (createdBy) {
      campaignDocument = await CampaignModel.findOne({ createdBy });
    }

    return campaignDocument;
  }

  doesTitleExist(title, document) {
    const existingTitle = document.campaigns.find(
      (element) => element.title === title
    );
    if (existingTitle) return true;
    return false;
  }

  async insertById(id, campaign) {
    try {
      const campaignDocument = await this.getDocument({ id });
      if (campaignDocument) {
        if (this.doesTitleExist(campaign.title, campaignDocument)) {
          return this.getError("insertById");
        }

        campaignDocument.campaigns.push(campaign);
        const updatedDocument = await campaignDocument.save();

        return {
          createdBy: campaignDocument.createdBy,
          campaigns: updatedDocument.campaigns.slice(-1)[0],
        };
      }

      return this.getError("insertById");
    } catch (error) {
      console.error("Error finding or updating campaign document:", error);
    }
  }

  async createCampaign(createdBy) {
    if (createdBy) {
      const newCampaign = new CampaignModel({
        createdBy,
        campaigns: [],
      });

      const response = await newCampaign.save();
      return response;
    } else {
      return this.getError("createCampain");
    }
  }

  async insertByName(createdBy, campaigns) {
    /**
    * could be inserted with createdBy or id
    * 
    * await campaign.insertCampaign({
        createdBy: "creator 0",
        campaigns: {
          title: "greate title 0",
          image: "my_img.jpg",
          raisedAmount: 0,
          targetAmount: 100,
        },
    });
    */
    try {
      let campaignDocument = await this.getDocument({ createdBy });
      // if Document with same creator doesn't exists create new Document.
      if (!campaignDocument) {
        campaignDocument = await this.createCampaign(createdBy, campaigns);
      }

      if (this.doesTitleExist(campaigns.title, campaignDocument)) {
        return this.getError("insertByName");
      }

      campaignDocument.campaigns.push(campaigns);
      const result = await campaignDocument.save();

      return {
        createdBy: campaignDocument.createdBy,
        campaigns: result.campaigns.slice(-1)[0],
      };
    } catch (err) {
      console.error("insertByName: Coudn't insert campaigns: ", err);
    }
  }

  async insertCampaign({ campaigns, createdBy, id }) {
    const campaign = await this.getCampaign({ id, createdBy });
    if (!campaign) {
      return this.getError("insertCampaign", id || createdBy);
    }

    if (id) {
      const result = await this.insertById(id, campaigns);
      return result;
    } else if (createdBy) {
      const result = await this.insertByName(createdBy, campaigns);
      return result;
    }
  }

  async getCampaign({ id, createdBy }) {
    try {
      if (!(id || createdBy)) {
        return this.getError("getCampaign");
      }

      if (id) {
        const response = await CampaignModel.findById(id);
        if (response) return response;
      } else if (createdBy) {
        const response = await CampaignModel.findOne({ createdBy });
        if (response) return response;
      }

      return this.getError("getCampaign");
    } catch (err) {
      console.error("GetCampaign: coudn't find campaign:", err);
    }
    return this.getError("getCampaign");
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
    createdBy: 'a Creater 1',
    title: 'greate title 3',
    image: 'exampleImage.jpg',
    raisedAmount: 0,
    targetAmount: 1000,
  }),
})
  .then(response => response.json())
  .then(campaigns => console.log(campaigns))
  .catch(err => console.log(err));


 */
