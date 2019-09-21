const Attendee = require('../models/attendees');

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
  app.get('/attendees', (req, res) => {
    Attendee.find({}, (err, attendees) => {
      if(err) {
        res.status(404).send(JSON.stringify({
          success: false,
          message: 'There were some errors'
        }));
      }
      else {
        res.status(200).send(JSON.stringify(attendees));
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
      attendee.time = Date.now();
      attendee.save(() => {
        res.status(200).send(JSON.stringify({
          success: true,
          message: 'Checkout successful'
        }));
      });
    });
  });

  app.get('/ready', (req, res) => {
    Attendee.updateMany({}, {$set: {checkedOut: false, time: null}}, (err, count) => {
      res.status(200).send(JSON.stringify({count}));
    })
  })
}