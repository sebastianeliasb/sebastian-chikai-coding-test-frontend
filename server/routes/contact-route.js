// Import express
const express = require("express");

// Import contacts-controller
const contactsRoutes = require("./../controllers/contact-controller.js");

// Create router
const router = express.Router();

// Add route for GET request to retrieve all contact
// In server.js, contacts route is specified as '/contacts'
// this means that '/all' translates to '/contacts/all'
router.get("/all", contactsRoutes.contactsAll);

// Add route for POST request to create new contact
// In server.js, contacts route is specified as '/contacts'
// this means that '/create' translates to '/contacts/create'
router.post("/create", contactsRoutes.contactsCreate);

// Add route for PUT request to delete specific contact
// In server.js, contacts route is specified as '/contacts'
// this means that '/delete' translates to '/contacts/delete'
router.put("/delete", contactsRoutes.contactsDelete);

// Add route for PUT request to reset contact list
// In server.js, contacts route is specified as '/contacts'
// this means that '/reset' translates to '/contacts/reset'
router.put("/reset", contactsRoutes.contactsReset);

// Export router
module.exports = router;
