class urlSchema{
    constructor(data){
        this.long_url = data['long_url'];
        this.suffix = data['suffixGenerated'];
        this.email = data['email'];
        this.dateOfCreation = data['dateOfCreation'];
    }
}

module.exports = urlSchema;