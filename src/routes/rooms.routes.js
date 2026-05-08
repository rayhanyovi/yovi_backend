const express = require("express");

const roomsController = require("../controllers/rooms.controller");

const router = express.Router();

router.get("/", roomsController.listRooms);

module.exports = router;
