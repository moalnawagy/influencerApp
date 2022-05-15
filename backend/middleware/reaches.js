const reachs = async(req, res, next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;


    console.log(ip);
}

module.exports = reachs