const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Students = new Schema({
    id:{type:String,required:true},
    name: {type: String, required :true },
    fathers_name:{type:String},
    contact_no:{type: Number},
    address:{type: String},
    class:{type:Number, min:1,max:10},
    gender:{type: String, enum:["boy","girl"]},
    issued_books:[{type:Schema.Types.ObjectId, ref:"Books"}]

});

module.exports = mongoose.model("Student",Students);
