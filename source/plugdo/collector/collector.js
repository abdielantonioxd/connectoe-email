
plugdo.collector("emailSend", {
  type: "http",
  action: "email",
  server: {
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 25,
    auth: {
      user: "labcode.pa@gmail.com",
      pass: "@abdiel1313",
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  template: 'compra',
  subject: "Test conector",
  templateOption: {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: 'content/template/',
      defaultLayout : 'welcome',
      partialsDir : 'content/template/welcome' 
  },
  viewPath: 'content/template/' ,
  extName: '.hbs'
}
});
