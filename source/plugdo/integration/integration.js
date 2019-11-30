plugdo.integration("send-email", (message, send) => {
  let response = {};
  // console.log(message)

  var emailData = {
    from: {
      email: "abdielantonio.af@gmail.com"
    },
    context: {
     data:{
      name: "Abdiel",
      totalP: 400,
      cantidad: 9
     }
    }
  }
  plugdo.collect("emailSend").get(emailData, (data, err) => {
    if (err) {
      send({}, err);
    } else {
      response.result = data;
      send(response);
    }
  });
})