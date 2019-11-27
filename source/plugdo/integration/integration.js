plugdo.integration("get-data", (message, send) => {
  let response = {};
  // console.log(message)
  plugdo.collect("MysqlSendDataGeneral").get(message, (data, err) => {
    if (err) {
      send({}, err);
    } else {
      response.result = data;
      send(response);
    }
  });
})
