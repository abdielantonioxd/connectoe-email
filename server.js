const plugdo = require("plugdo-node").node();
const path = require("path");
 
// Register the connectors here!
const myDatabaseConnector = require("./email-connector");
plugdo.registerConnector("http", "email", myDatabaseConnector.email());
 
plugdo.start(80, path.resolve(__dirname));