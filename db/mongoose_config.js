var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tanweer:myfriend.a1@ds051605.mlab.com:51605/devfest", { useNewUrlParser: true });
//mongoose.connect("mongodb://localhost:27017/devfest", { useNewUrlParser: true });
module.exports={mongoose};