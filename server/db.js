const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create a table in the database called "contacts"
knex.schema
  // Make sure no "contacts" table exists
  // before trying to create new
  .hasTable("contacts")
  .then((exists) => {
    if (!exists) {
      // If no "contacts" table exists
      // and use "id" as a primary identification
      // and increment "id" with every new record (contact)
      return knex.schema
        .createTable("contacts", (table) => {
          table.increments("id").primary();
          table.string("firstName");
          table.string("lastName");
          table.string("email");
          table.integer("age");
          table.string("phoneNumber");
          table.string("avatar");
          table.string("link");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Contacts' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "contacts" table
knex
  .select("*")
  .from("contacts")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

// Export the database
module.exports = knex;
