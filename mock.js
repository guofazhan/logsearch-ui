const fs =require('fs');
const path = require('path');
const proxy = {};
fs.readdirSync(path.join(__dirname + '/src/mock')).forEach(function(file) {
    Object.assign(proxy, require('./src/mock/' + file));
})
module.exports = proxy

