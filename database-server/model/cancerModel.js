var mongoose  = require('mongoose');


const Schema = mongoose.Schema;

const cancerSchema = Schema({
    type : {
        type : String,
        default : 'cancer'
    },
    'radm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'texm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'perm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'arem': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'smom': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'comm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'conm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'conpm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'symm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'fradm': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'rads': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'texs' : {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'pers': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'ares': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'smos': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'coms': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'cons': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'conps': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'syms': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'frads': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'radw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'texw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'perw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'arew': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'smow': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'somw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'conw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'conpw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'symw': {
        type : Number,
        required : [true , "Field cannot be empty"]
    },
    'fradw': {
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


const Cancer = mongoose.model('Cancer' , cancerSchema);
module.exports = Cancer;