# Devfest Admin
Node.js backend for Devfest Admin app.

## Steps to deploy 
- Create a heroku app( **heroku create** ). **Note the base_url of newly generated app**.
- Set environment variable MONGODBURI to your mongoDB database uri in app dashboard on heroku website.
- Push whole code base to heroku servers( **git push heroku master** ).

## Database schema
```
    orderId: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    checkedOut: Boolean,
    time: String
```