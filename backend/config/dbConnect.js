const mongoose = require('mongoose');

const connection = async() => {
    mongoose.connect(process.env.DBURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((res) => {
        console.log(`Mongoos Connected To ${res.connection.host}`);
    }).catch((err) => {
        console.log(`Error Happend While Connecting: ${err}`);
    })
}

module.exports = connection