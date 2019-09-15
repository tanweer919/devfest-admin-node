var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true });
//mongoose.connect("mongodb://localhost:27017/devfest", { useNewUrlParser: true });
module.exports={mongoose};