module.exports = app => {
  const entries = require("../controllers/main_entry.controller.js");

  var router = require("express").Router();

  router.post("/", entries.create);

  router.get("/", entries.findAll);

  router.get("/CO2", entries.findAllCO2);

  router.get("/:id", entries.findOne);

  router.put("/:id", entries.update);

  router.delete("/:id", entries.delete);

  router.delete("/", entries.deleteAll);

  app.use('/api/entries', router);
};