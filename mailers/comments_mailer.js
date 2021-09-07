const nodeMailer = require('../config/nodemailer')

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplete({comment : comment}, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'codeial@cn.in',
        to: comment.user.email,
        subject: 'new comment published',
        html: htmlString,

    },(err, info)=> {
        if(err){
            console.log('Error in sending mails',err)
            return;
        }
        console.log('Message sent',info)
        return 
    })
}