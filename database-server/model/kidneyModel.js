var mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const kidneySchema = Schema({
    type : {
        type : String,
        default : 'ckd'
    },
    'age': {
        type : Number,
        required : [true , "Field cannot be empty"]
    }, 
    'bp': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'sg': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'al': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'su': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'rbc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pcc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'ba': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'bgr': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'bu': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'sc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'sod': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pot': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'hemo': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pcv': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'wc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'rc': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'htn': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'dm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'cad': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'appet': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pe': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'ane': {
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


const Kidney = mongoose.model('Kidney' , kidneySchema);
module.exports = Kidney;