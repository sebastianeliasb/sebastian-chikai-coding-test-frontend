// Import database
const knex = require("./../db");

exports.contactsAll = async (req, res) => {
  knex
    .select("*")
    .from("contacts")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving contacts: ${err}` });
    });
};

exports.contactsCreate = async (req, res) => {
  knex("contacts")
    .insert({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      avatar: req.body.avatar,
      link: req.body.link,
      tags: req.body.tags,
    })
    .then((response) => {
      res.json({
        message: `Contact '${req.body.firstName}' ${req.body.lastName} created.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating '${req.body.firstName}' ${req.body.lastName} contact: ${err}`,
      });
    });
};

exports.getContact = async (req, res) => {
  knex("contacts")
    .where("id", req.body.id)
    .then((contactData) => {
      res.json({
        contactData,
        message: `id : ${req.body.id}`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error fetch '${req.body.id}' contact: ${err}`,
      });
    });
};

exports.contactEdit = async (req, res) => {
  console.log(req.body, "body");
  knex("contacts")
    .update({
      firstName: req.body.contact.firstName,
      lastName: req.body.contact.lastName,
      email: req.body.contact.email,
      age: req.body.contact.age,
      phoneNumber: req.body.contact.phoneNumber,
      avatar: req.body.contact.avatar,
      link: req.body.contact.link,
      tags: req.body.contact.tags,
    })

    .where("id", req.body.contact.id)

    .then(() => {
      res.json({
        message: `Contact ${req.body.contact.firstName} ${req.body.contact.lastName} edited.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error editing '${req.body.contact.firstName}' ${req.body.contact.lastName} contact: ${err}`,
      });
    });
};

exports.contactsDelete = async (req, res) => {
  knex("contacts")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({
        message: `Contact ${req.body.firstName} ${req.body.lastName} deleted.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating '${req.body.firstName}' ${req.body.lastName} contact: ${err}`,
      });
    });
};

exports.contactsReset = async (req, res) => {
  knex
    .select("*")
    .from("contacts")
    .truncate()
    .then(() => {
      res.json({ message: "Contacts cleared." });
    })
    .catch((err) => {
      res.json({
        message: `There was an error resetting all contacts: ${err}.`,
      });
    });
};
