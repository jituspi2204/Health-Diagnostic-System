var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var Schema = mongoose.Schema;
var emailValidator  = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var doctorSchema = Schema({
    name : {
        type : String,
        required : [true , "Name cannot be empty"]
    },
    email : {
        type : String, 
        required : [true,  "Email cannot be empty"],
        validate : [val => emailValidator.test(val) , "Invalid Email"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "Password is not valid"],
        minLength : 8,
        select : false
    },
    specialization : {
        type : String , 
        required : [true , "Specialization cannot be empty"],
    },
    heartData : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Heart'
        },
    ],
    kidneyData : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Kidney'
        },
    ],
    cancerData : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Cancer'
        },
    ],
    createdAt :{
        type : mongoose.Schema.Types.Date,
        required : [true, "Date cannot be empty"],
        default : Date.now()
    },
    updatedAt : {
        type : mongoose.Schema.Types.Date,
        required : [true, "Date cannot be empty"],
        default : Date.now()
    },
    urlKey : {
        type : String,
        default : null,
    },
    validateType : {
        type : Boolean,
        default : false,
    },
    emailVerified : {
        type : Boolean,
        default : false
    },
    

})


doctorSchema.pre('save' , async function(next){
    this.name = this.name.toUpperCase();
    if(this.validateType){
        this.validateType =false;
        this.password = await bcryptjs.hash(this.password , 11);
        // console.log(this.password);
    }
    next();
})


const Doctor = mongoose.model('Doctor' , doctorSchema);
module.exports = Doctor;