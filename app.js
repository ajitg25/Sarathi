const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000
const bodyParser = require("body-parser");
const path = require('path');


const { auth, requiresAuth} = require('express-openid-connect');
app.use(
  auth({
    authRequired : false,
    auth0Logout: true,
    issuerBaseURL:process.env.ISSUER_BASE_URL ,
    baseURL: process.env.BASE_URL,
    clientID:process.env.CLIENT_ID ,
    secret: process.env.SECRET ,
    idpLogout: true,
  })
);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/public', express.static(path.join(__dirname,'./static')));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/home', requiresAuth(), (req, res) => {
    res.sendFile(path.join(__dirname+'/login.html'));

})

app.get('/callback', (req, res) => {
  res.send('Hello Callback!')

})
app.get('/success', (req, res) => {
  res.send('SUCCESS!')

})

app.post("/home", function(req, res){


  console.log(req.body);
  // var num1 = Number(req.body.num1);
  // var num2 = Number(req.body.num2);

  // var result = num1 + num2;
  // res.send("Answer is " + result );


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})