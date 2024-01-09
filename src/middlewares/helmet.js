const helmet = require("helmet");

module.exports = function configureHelmet(app) {
  app.use(
    helmet({
      // ...
    })
  );
};
