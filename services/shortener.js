var uuid = require('uuid/v4');
var mailerService = require('../services/mailerService');
var dbService = require('../services/dbService')
const base_address = 'https://short.en';

function gen_random_string(){
    return uuid();
}

function send_mail(email){
    mailerService.sendmail(email)
}

function check_url(req_url){
    var url = String(req_url);
    var re = new RegExp("[a-z]+[a-zA-Z0-9]*\.(com).*");
    if(!(url.match(re))){
        throw new Error('Invalid URL passed to shorten');
    }
}

function url_shorten(req){
    var to_shorten_url = req.body.long_url;
    check_url(to_shorten_url);
    var random_string = gen_random_string().substring(0,7);
    var short_url = base_address+'/'+random_string;
    dbService.createRecord(to_shorten_url, random_string, req.body.email);
    // send_mail(req.body.email,short_url);
    return [short_url, req.body.email];
}

/*Handles what to export from this file. In this case we only expose
one function from the file. Later on if we want, we can anytime export vars and functions*/
module.exports = {
    shorten: function(req){
        return url_shorten(req);
    }
}