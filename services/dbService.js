var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var db = mongoose.connection;
const url = "mongodb://localhost:27017/";
const db_name = "url_db";
const collection_name = "urlDetails";

var url_db_model = require('../models/urlDBModel');

function createModelEntity(long_url, suffix, email){

    if(checkExistance(long_url)){
        throw new Error('The URL is already shortened once!');
    }
    var data = {long_url: long_url, suffixGenerated: suffix, email: email, dateOfCreation: new Date()}
    var newURLModel = new url_db_model(data);
    
    saveEntity(newURLModel);
}

function saveEntity(newURLModel){
    mongo.connect(url, function(err, db){
        if (err) throw new Error('Error with db');
        var dbo = db.db(db_name);
        dbo.collection(collection_name).insertOne(newURLModel, function(err, res){
            if (err) throw new Error('Couldn\'t save the details');
            db.close();
        });
    });
}

function checkExistance(long_url){
    mongo.connect(url, function(err,db){
        if (err) throw new Error('Error with db');
        var dbo = db.db(db_name);
        dbo.collection(collection_name).findOne({"long_url":long_url}, function(err, result){
            if (err) throw new Error('Error reading from db');
            if (result) return true;
            //else not found and can be added into the db
            db.close();
        })
    })
}

module.exports = {
    createRecord: function(long_url, suffix, email){
        createModelEntity(long_url, suffix, email);
    }
}