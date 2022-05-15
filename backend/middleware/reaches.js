const requestIp = require('request-ip');
const Reach = require('../models/reach.model');


const reachs = async(req, res, next) => {

    console.log(data);
    const clientIp = requestIp.getClientIp(req);
    Reach.insertMany({ ip: clientIp }).then((result) => {
        next()
    })

}

module.exports = reachs