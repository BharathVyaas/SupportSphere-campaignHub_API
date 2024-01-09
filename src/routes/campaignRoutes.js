const express = require("express");

const campaignController = require("../controllers/campaignController");

const router = express.Router();

router.get("/campaign-list", campaignController.getCampaignList);

router.post("/campaign-create", campaignController.createCampaign);

module.exports = router;
