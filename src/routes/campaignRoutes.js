const express = require("express");

const campaignController = require("../controllers/campaignController");

const router = express.Router();

// sends campaignHub document
router.get("/campaign-list", campaignController.getCampaignListController);

// creates a new campaign in database with {createdBy: created user, campaign: [{campaign related details}]}
router.post("/campaign-create", campaignController.createCampaignController);

module.exports = router;
