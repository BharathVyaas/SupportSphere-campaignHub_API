require("dotenv").config();
const express = require("express");

const CampaignModel = require("./db/db");

const app = express();

app.get("/campaign-list", async (_, res) => {
  const campaignList = await CampaignModel.find({}).exec();

  res.status(200).json(campaignList);
});

app.use("/", (_, res) => {
  res
    .status(404)
    .setHeader("Content-Type", "text/html")
    .send("<h1>Page Not Found</h1>");
});

//  PORT
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
