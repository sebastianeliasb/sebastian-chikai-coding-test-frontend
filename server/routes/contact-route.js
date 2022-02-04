const express = require("express");

const contactsRoutes = require("./../controllers/contact-controller.js");

const router = express.Router();

router.get("/all", contactsRoutes.contactsAll);

router.put("/contact", contactsRoutes.getContact);

router.put("/edit", contactsRoutes.contactEdit);
router.post("/create", contactsRoutes.contactsCreate);

router.put("/delete", contactsRoutes.contactsDelete);

router.put("/reset", contactsRoutes.contactsReset);

module.exports = router;
