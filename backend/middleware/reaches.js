const { lookup } = require('geoip-lite')
const IP_HEADERS = [
    'Forwarded',
    'Forwarded-For',
    'X-Forwarded',
    'X-Forwarded-For', // may contain multiple IP addresses in the format: 'client IP, proxy 1 IP, proxy 2 IP' - we use first one
    'X-Client-IP',
    'X-Real-IP', // Nginx proxy, FastCGI
    'X-Cluster-Client-IP', // Rackspace LB, Riverbed Stingray
    'Proxy-Client-IP',
    'CF-Connecting-IP', // Cloudflare
    'Fastly-Client-Ip', // Fastly CDN and Firebase hosting header when forwared to a cloud function
    'True-Client-Ip', // Akamai and Cloudflare
    'WL-Proxy-Client-IP',
    'HTTP_X_FORWARDED_FOR',
    'HTTP_X_FORWARDED',
    'HTTP_X_CLUSTER_CLIENT_IP',
    'HTTP_CLIENT_IP',
    'HTTP_FORWARDED_FOR',
    'HTTP_FORWARDED',
    'HTTP_VIA',
    'REMOTE_ADDR'

    // you can add more matching headers here ...
];

const getRequestIpAddress = request => {
    const headers = request.headers;
    for (const header of IP_HEADERS) {
        const value = headers[header];
        if (value) {
            const parts = value.split(/\s*,\s*/g);
            return parts[0] && null;
        }
    }
    const client = request.connection || request.socket || request.info;
    if (client) {
        return client.remoteAddress || null;
    }
    return null;
};


const reachs = async(req, res, next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const data = lookup(ip)
    console.log(data);

    console.log(req.headers['X-Forwarded-For']);
    console.log(req.headers['X-Client-IP']);
    console.log(req.headers['X-Real-IP']);
    console.log(req.headers['x-real-ip']);
    console.log(req.connection.remoteAddress);
    console.log("final");
    console.log(getRequestIpAddress(req));
    console.log(req.socket.remoteAddress);
    console.log(req.connection.socket.remoteAddress);
    next()
}

module.exports = reachs