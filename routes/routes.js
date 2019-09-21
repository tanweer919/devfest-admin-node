const Attendee = require('../models/attendees');
const moment = require('moment');

module.exports = (app) => {
  app.get('/attendee/total', (req, res) => {
    Attendee.find({}).countDocuments((err, totalCount) => {
      if(err) {

      }
      else {
        Attendee.find({checkedOut: true}).countDocuments((err, count) => {
          if(err) {
            res.status(404).send(JSON.stringify({
              success: false,
              message: 'There were some errors'
            }));
          }
          else {
            res.status(200).send(JSON.stringify({success: true, totalCount, totalCheckedOut: count}));
          }
        });
      }
    });
  });
  app.get('/registered', (req, res) => {
    Attendee.find({}, (err, registered) => {
      if(err) {
        res.status(404).send(JSON.stringify({
          success: false,
          message: 'There were some errors'
        }));
      }
      else {
        res.status(200).send(JSON.stringify({registeredList: registered}));
      }
    });
  });
    app.get('/attendees', (req, res) => {
      Attendee.find({checkedOut: true}, (err, attendees) => {
        if(err) {
          res.status(404).send(JSON.stringify({
            success: false,
            message: 'There were some errors'
          }));
        }
        else {
          res.status(200).send(JSON.stringify({attendeeList: attendees}));
        }
      });
  });
  app.post('/checkout', (req, res) => {
    if(!req.body.orderId) {
      return res.status(404).send(JSON.stringify({
        success: false,
        message: 'OrderId is required for checkout'
      }));
    }
    Attendee.findOne({orderId: req.body.orderId}, (err, attendee) => {
      if(err) {
        return res.status(404).send(JSON.stringify({
          success: false,
          message: 'There were some problems'
        }));
      }
      if(!attendee) {
        return res.status(404).send(JSON.stringify({
          success: false,
          message: 'No attendee found'
        }));
      }
      if(attendee.checkedOut === true) {
        return res.status(404).send(JSON.stringify({
          success: false,
          message: 'Attendee has already been checked out'
        }));
      }
      attendee.checkedOut = true;
      attendee.time = moment.unix(Date.now()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');;
      attendee.save(() => {
        res.status(200).send(JSON.stringify(attendee));
      });
    });
  });

  app.get('/ready', (req, res) => {
    Attendee.updateMany({}, {$set: {checkedOut: false, time: null}}, (err, count) => {
      res.status(200).send(JSON.stringify({count}));
    })
  })
}