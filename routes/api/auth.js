const { Router } = require("express");

const auth = require("./auth/index");
const reset = require("./auth/reset");
const stats = require("./auth/stats");

const route = Router();

route.use("/", auth);
route.use("/reset", reset);
route.use("/stats", stats);

module.exports = route;