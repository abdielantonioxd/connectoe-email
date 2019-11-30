var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
path.resolve(__dirname)
const email = {
  callback: false,
  options: {
    server: {
      host: "",
      service: "",
      secure: "",
      port: "",
      auth: {
        user: "",
        pass: "",
      },
      tls: {
        rejectUnauthorized: ""
      }
    },
    template: "",
    subject:"",
    templateOption: {
      viewEngine: {
        extname: '',
        layoutsDir: "",
        defaultLayout: "",
        partialsDir: ""
      },
      viewPath: "",
      extName: ""
    },
    parameter: []
  },
  get: function (message, send) {
    var self = this;

    this.createTransport_email = function () {
      async function main() {
        var templateOp = self.options.templateOption;
        setTransportData(self.options).use('compile', hbs(templateOp));
        setTransportData(self.options).sendMail(dataFromEmail(self.options, message), function (error, response) {
          if (error != null) {
            func_errorExist(error,send);
            setTransportData(self.options).close();
          } else {
            func_succes(response,send);
            setTransportData(self.options).close();
          }
        })
      }

      main();
    }

    this.createTransport_email();
  }
};


var setTransportData = function (options) {
  let transporter = nodemailer.createTransport({
    host: options.server.host,
    service: options.server.service,
    secure: options.server.secure,
    port: options.server.port,
    auth: {
      user: options.server.auth.user,
      pass: options.server.auth.pass,
    }, tls: {
      rejectUnauthorized: options.server.tls.rejectUnauthorized
    }
  });
  return transporter;
}

var validateEmail = function (options) {
  if (options.server.auth.user != "") {
    return options.server.auth.user
  } else {
    throw new Error("404", "the user email  is required.")
  }
}

var dataFromEmail = function (options, message) {
  var from = {
    from: validateEmail(options),
    to: message.from.email,
    subject: options.subject,
    template: options.template,
    context: {
     
    }
  }
  return from
}

var func_errorExist = function (error,send) {
  return send({
    err: true,
    status: 410,
    response: error
  })
  
}

var func_succes = function (response,send) {
  return  send({
    err: false,
    status: 200,
    response: response
  });
}



exports.email = function () {
  return email;
};

