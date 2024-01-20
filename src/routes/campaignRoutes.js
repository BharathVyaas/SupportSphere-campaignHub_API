const express = require("express");

const campaignController = require("../controllers/campaignController");

const router = express.Router();

router.get(
  "/view-campaigns/:method",
  campaignController.getCampaignMethodListController
);

// sends campaignHub document
router.get("/view-campaigns", campaignController.getCampaignListController);

// creates a new campaign in database with {createdBy: created user, campaign: [{campaign related details}]}
router.post("/create-campaign", campaignController.createCampaignController);

// updates existing collection and returns updated collection
router.patch("/update-campaign", campaignController.editCampaignController);

// ...
router.delete("/delete-campaign", campaignController.deleteCampaignController);

module.exports = router;
