const requestIp = require('request-ip');
const Reach = require('../models/reach.model');


const reachs = async(req, res, next) => {

    const clientIp = requestIp.getClientIp(req);
    Reach.insertMany({ ip: clientIp }).then((_) => {
        next()
    })

}

module.exports = reachs