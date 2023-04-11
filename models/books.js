const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Books = new Schema({
    id:{type:String,required:true},
    name: {type: String, required :true },
    author: {type: String},
    publication: {type:String},
    language:{type: String,
                enum:["Hindi","English"]},
    lastIssueDate:{type: String}

});

module.exports = mongoose.model("Books", Books);
