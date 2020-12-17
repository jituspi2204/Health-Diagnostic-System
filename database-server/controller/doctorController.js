var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var bcryptjs = require('bcryptjs')

var hoc = require('../assets/getAsync');
var Doctor = require('../model/doctorModel');
var Heart = require('../model/heartModel');
var Kidney = require('../model/kidneyModel');
var Cancer = require('../model/cancerModel');
var constants = require('../assets/constants');
var Email = require('../email');

exports.signup = async (req , res ,next) => {
    try {
        const {name, email , password , specialization} = {...req.body};
        console.log(name, email,password);
        const token = await crypto.randomBytes(32).toString('hex');
        const urlKey = await crypto.createHmac('sha256' , process.env.SESSION_KEY )
        .update(token)
        .digest('hex');
        console.log(urlKey);
        const doctor = await Doctor.create({
            name, email, password, urlKey, specialization , validateType : true
        })
        await doctor.save({validateBeforeSave :true});
        const url = `${constants.viewURL}/doctor/validate/${token}/${doctor._id}`;
        console.log(url);
        new Email(doctor , url).verifyEmail();
        res.status(200).json({
            status: "success",
            message: "Verification Link Send to Registered Email",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : error
        })
    }
}

exports.validateDoctor = async (req ,res , next) => {
    const { token } = { ...req.params };
    const { id } = { ...req.query };
    console.log(token , id);
    var urlKey = await crypto.createHmac('sha256' , process.env.SESSION_KEY )
    .update(token)
    .digest('hex');
    console.log(urlKey);
    var doctor = await Doctor.findOne({_id : id , urlKey : urlKey});
    console.log(doctor);
    if(doctor){
        doctor.validateType = false;
        doctor.urlKey = null;
        doctor.emailVerified = true;
        await doctor.save({validateBeforeSave :false});
        var jwtToken = await constants.createJWT(doctor._id);
        res.cookie("jwt", jwtToken , {
            httpOnly : true,
            secure : false
          });
        res.status(200)
        .send({
            status : "verified",
            token : jwtToken
        })
    }else{
        res.status(401)
        .send({
            status : "denied",
            message : "Invalid url"
        })
    }
}


exports.signin = async (req , res ,next) => {
    try {
        const {email , password} = {...req.body};
        console.log(email,password);
        var doctor = await Doctor.findOne({email}).select('+password').populate('Kidney').populate('Heart').populate('Cancer');
        console.log(doctor);
        if(doctor){
            var isValidDoctor = await bcryptjs.compare(password , doctor.password);
            console.log(isValidDoctor);
            if(isValidDoctor){
                let jwtToken = await constants.createJWT(doctor._id);
                res.cookie('jwt' , jwtToken , {
                    httpOnly : true,
                    secure : false,
                    maxAge : 100000 
                });
                res.status(200).json({
                    status: "success",
                   token : jwtToken,
                   doctor : {
                       name : doctor.name,
                       email : doctor.email,
                   }
                });
            }else{
                res.status(401).json({
                    status : "denied",
                    message : "Invalid email or password"
                })
            }
        }else{
            res.status(401).json({
                status : "denied",
                message : "Invalid email or password"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : error
        })
    }
}

const getListOfData = async(req) => {
    var heartData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Heart.findById(el);
        })
    );
    var cancerData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Cancer.findById(el);
        })
    );
    var kidneyData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Kidney.findById(el);
        })
      );
    return [...kidneyData, ...heartData, ...cancerData];
}

exports.insertDisease = async (req , res ,next) => {
    try {
        const {values} = {...req.body};
        const { disease } = { ...req.params };
        console.log(values ,disease);
        if(disease === 'cancer'){
            var cancer = await Cancer.create({
                ...values,
                doctorId : req.doctor._id,
                type : 'cancer',
            })
            await Doctor.updateOne({_id : req.doctor._id} , {$push : {cancerData : cancer._id}})
            let patientData = await getListOfData(req);
            res.status(200).json({
                status: "success",
                response: cancer,
                patientData 
                
            });
        }else if(disease === 'heart'){
            var heart = await Heart.create({
                ...values,
                doctorId : req.doctor._id,
                type : 'heart'
            })
            await Doctor.updateOne({_id : req.doctor._id} , {$push : {heartData : heart._id}})
            let patientData = await getListOfData(req);

            res.status(200).json({
                status: "success",
                response: heart,
                patientData 

            });
        }else if(disease === 'kidney'){
            var kidney = await Kidney.create({
                ...values,
                doctorId : req.doctor._id
            })
            await Doctor.updateOne({_id : req.doctor._id} , {$push : {kidneyData : kidney._id}})
            let patientData = await getListOfData(req);
        
            res.status(200).json({
                status: "success",
                response: kidney,
                patientData 

            });
        }else{
            res.status(404).send();
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : error
        })
    }
}

exports.me = async(req ,res ,next) => {
    var heartData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Heart.findById(el);
        })
    );
    var cancerData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Cancer.findById(el);
        })
    );
    var kidneyData = await Promise.all(
        req.doctor.heartData.map(async (el) => {
          return await Kidney.findById(el);
        })
      );
    var patientData = [...kidneyData, ...heartData, ...cancerData];
    // console.log(patientData);
    res.status(200)
    .json({
        status : "done",
        doctor : req.doctor,
        patientData 
    })
}