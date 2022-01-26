// Import database
const knex = require("./../db");

// Retrieve all contacts
exports.contactsAll = async (req, res) => {
  // Get all contacts from database
  knex
    .select("*") // select all records
    .from("contacts") // from 'contacts' table
    .then((userData) => {
      // Send contacts extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving contacts: ${err}` });
    });
};

// Create new contact
exports.contactsCreate = async (req, res) => {
  // Add new contact to database
  knex("contacts")
    .insert({
      // insert new record, a contact
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      avatar: req.body.avatar,
      link: req.body.link,
      tags: req.body.tags,
    })
    .then(() => {
      // Send a success message in response
      res.json({
        message: `Contact '${req.body.firstName}' ${req.body.lastName} created.`,
      });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating '${req.body.firstName}' ${req.body.lastName} contact: ${err}`,
      });
    });
};

//Get specific contact
// exports.getContact = async (req, res) => {
//   // Find specific contact in the database and remove it
//   knex("contacts")
//     .where("id", req.body.id) // find correct record based on id
//     .then(() => {
//       // Send a success message in response
//       res.json({
//         message: req.body.id,
//       });
//     })
//     .catch((err) => {
//       // Send a error message in response
//       res.json({
//         message: `There was an error fetch '${req.body.id}' contact: ${err}`,
//       });
//     });
// };
// Remove specific contacts
exports.contactsDelete = async (req, res) => {
  // Find specific contact in the database and remove it
  knex("contacts")
    .where("id", req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({
        message: `Contact ${req.body.firstName} ${req.body.lastName} deleted.`,
      });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating '${req.body.firstName}' ${req.body.lastName} contact: ${err}`,
      });
    });
};

// Remove all contacts on the list
exports.contactsReset = async (req, res) => {
  // Remove all contacts from database
  knex
    .select("*") // select all records
    .from("contacts") // from 'contacts' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: "Contacts cleared." });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error resetting all contacts: ${err}.`,
      });
    });
};
