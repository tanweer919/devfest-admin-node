var mongoose = require('mongoose');
const attendeeSchema = new mongoose.Schema(
  {
    orderId: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    checkedOut: {type: Boolean, default: false},
    time: String
  }
);
module.exports = mongoose.model("Attendee", attendeeSchema);