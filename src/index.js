require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configureHelmet = require("./middlewares/helmet");
const campaignRouter = require("./routes/campaignRoutes");

// Declarations
const app = express();
configureHelmet(app);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/campaign", campaignRouter);

// Not Found
app.use("/*", (_, res) => {
  res
    .status(404)
    .setHeader("Content-Type", "text/html")
    .send("<h1>Page Not Found</h1>");
});

//  PORT
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
