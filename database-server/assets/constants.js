var jwt = require('jsonwebtoken');

module.exports = {
    viewURL : 'https://health-diagnostic-system.herokuapp.com',
    createJWT : async(id) => {
        const jwtToken = await jwt.sign({id : id} , process.env.KEY , {
            expiresIn : '10d'
        })
        return jwtToken;
    }
}