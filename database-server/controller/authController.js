var jwt = require('jsonwebtoken');
var Doctor = require('../model/doctorModel');
const { promisify} = require('util');



exports.protectedUser = async(req , res, next) => {
    try {
        var jwtToken = req.headers.authorization.split(' ').pop();
        console.log(jwtToken);
        if(jwtToken){
            const token = await promisify(jwt.verify)(jwtToken , process.env.KEY);
            const doctor = await Doctor.findById(token.id).select('+emailConfirmed').populate('Heart');
            if(doctor){
                req.doctor = doctor;
                return next();
            }else{
                res.status(401).send();
            }
        }
        if(req.cookies.jwt){
            const token = await promisify(jwt.verify)(req.cookies.jwt , process.env.KEY);
            console.log(token);
            const doctor = await Doctor.findOne({'_id' : token.id}).select('+emailConfirmed').populate('Heart').populate('Kidney').populate('Cancer');
            console.log(doctor);
            if(doctor){
                req.doctor = doctor;
                return next();
            }else{
                res.status(401).send();
            }
        }
        res.status(401).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : error
        });
    }
    
};