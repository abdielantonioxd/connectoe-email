

plugdo.collector("MysqlSendDataGeneral", {
  type: "db",
  action: "mysql",
  server: {
    user: "root",
    password: "1997",
    host: "localhost",
    database: "nanny365"
  },
  queryType: "stored-procedure",
  query: "call  SP_selectNannys",
  parameter: []
});
