const plugdo = require("plugdo-node").node();
const path = require("path");
 
// Register the connectors here!
const myDatabaseConnector = require("mysql-connector-plugdo/mysql");
plugdo.registerConnector("db", "mysql", myDatabaseConnector.mysql());
 
plugdo.start(80, path.resolve(__dirname));