var nodemailer = require('nodemailer');

function mail_send(email){
    check_email(email);
    //send_email(email,url);
}

function check_email(email){
    var _email = new String(email);
    var re = new RegExp("[a-z]*[a-zA-Z0-9,.]*@{1}.*\.com$");
    if(!(_email.match(re))){
        throw new Error('Incorrect email address');
    }
}

function send_email(email,url){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'techguyinfo@gmail.com',
            pass: 'something'
        }
    });

    var mainOptions = {
        from: 'John Doe<johnDoe@gmail.com>',
        to: email,
        subject: 'Shortened URL',
        text: 'Your url is: '+url
    };

    transporter.sendMail(mailOptions, function(){
        if(error){
            throw new Error('Error in sending email. Link shortened was not stored')
        }
        else{
            //do nothing
            console.log('Mail sent successfully to'+email);
        }
    })
}

/*Handles what to export from this file. In this case we only expose
one function from the file. Later on if we want, we can anytime export vars and functions*/
module.exports = {
    sendmail: function(email,url){
        mail_send(email,url);
    }
}