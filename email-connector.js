var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
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
      },
      template: ""
    },
    templateOption: {
      viewEngine: {
        extname: '.hbs',
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
        var template = this.options.templateOption;
        setTransportData(this.options).use('compile', hbs(template));

        setTransportData(this.options).sendMail({
          from: validateEmail(this.options),
          to: message.email,
          subject: this.options.server.subject,
          template: this.options.server.template,
          context: {
            data: message.data
          }
        }, function (error, response) {
          if (error != undefined) {
            throw new Error("message not send.")
          }
          setTransportData(this.options).close();
        })

      }

      main().catch(console.error);
      send.sendStatus(200)
      send.end()
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
      user: options.server.user,
      pass: options.server.pass,
    }, tls: {
      rejectUnauthorized: options.server.rejectUnauthorized
    }
  });

  return transporter;
}

var validateEmail = function (options) {
  if (options.user != "") {
    return options.user
  } else {
    throw new Error("404", "the user is required.")
  }
}

exports.email = function () {
  return email;
};

