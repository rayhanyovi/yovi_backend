const express = require("express");

const authRoutes = require("./auth.routes");
const availabilityRoutes = require("./availability.routes");
const bookingsRoutes = require("./bookings.routes");
const roomsRoutes = require("./rooms.routes");
const unitsRoutes = require("./units.routes");
const usersRoutes = require("./users.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
});

router.use("/auth", authRoutes);
router.use("/availability", availabilityRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/rooms", roomsRoutes);
router.use("/units", unitsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
