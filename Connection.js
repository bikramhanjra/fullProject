const mongoose = require("mongoose")
function connectMongoDb(mongoURL){
   return mongoose.connect(mongoURL);
};

module.exports = {connectMongoDb};