const nodemailer = require('nodemailer')
const path = require ('path')
const ejs = require('ejs')
const SMTPConnection = require('nodemailer/lib/smtp-connection')
const { relative } = require('path')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure : false,
    auth:{
        user: 'enter your email',
        pass: 'enter you password',

    }
}) 

let renderTemplete = (data, relativePath) => {
    let mailHTML
    ejs.renderFile(
        path.join(__dirname ,'../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering in template',err);return}

            mailHTML = template
        }
    )
    return mailHTML;

}

module.exports = {
    transporter : transporter,
    renderTemplete : renderTemplete 
}
