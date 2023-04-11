const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const Issues = new Schema({
    studentId:{type:String},
    bookId:{type:String},
    date_of_issue:{type: Date},
    

});

module.exports = mongoose.model("Issue", Issues);

