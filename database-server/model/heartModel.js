var mongoose  = require('mongoose');


const Schema = mongoose.Schema;

const heartSchema = Schema({
    type : {
        type : String,
        default : 'heart'
    },
    age : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    sex :{
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    cp:{
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    trestbps : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    chol: {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    fbs : {
        type : String,
        required : [true , "Field cannot be empty"]
    },
    restecg : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    thalach : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    exang : {
        type : String,
        required : [true , "Field cannot be empty"]
    },
    oldpeak : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    slope : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    ca : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    thal : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    target : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    doctorId : {
        type : mongoose.Schema.Types.ObjectId , 
        required : [true , "Doctor Id cannot be empty"],
    }
    ,
    createdAt :{
        type : mongoose.Schema.Types.Date,
        required : [true, "Date cannot be empty"],
        default : Date.now()
    },
    updatedAt : {
        type : mongoose.Schema.Types.Date,
        required : [true, "Date cannot be empty"],
        default : Date.now()
    }
})


const Heart = mongoose.model('Heart' , heartSchema);
module.exports = Heart;