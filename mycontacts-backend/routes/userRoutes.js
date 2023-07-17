const express = require("express");
const {registerUser, loginUser, currentUser, logoutUser} = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")

const router = express.Router();

// router.use(cors());
router.post("/logout", logoutUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

module.exports = router;