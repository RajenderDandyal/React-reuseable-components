// convention for modals is ... singular and capitalize eg this file name .... User.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
  contactNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
});

module.exports = User = mongoose.model('users', UserSchema);
