const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000
const bodyParser = require("body-parser");
const path = require('path');
// const loc = require(__dirname + "/location.js");


// function get_location(){
//   var cur_loc = loc.getLoc();
//   return cur_loc;
// }

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
  if(req.oidc.isAuthenticated()){
    res.sendFile(path.join(__dirname+'/login.html'));

  }
  else{
    res.redirect('http://localhost:3000/login');
  }
  // res.sendFile(req.oidc.isAuthenticated() ? path.join(__dirname+'/login.html') : "logged out")
})

// app.get('/home', requiresAuth(), (req, res) => {
//     res.sendFile(path.join(__dirname+'/login.html'));

// })

app.get('/callback', (req, res) => {
  res.send('Hello Callback!')

})
app.get('/success', (req, res) => {
  res.send('SUCCESS!')

})

app.post("/home", function(req, res){


  console.log(req.body);
  var LoggedInAs = req.body.loginas;
  console.log(LoggedInAs)

  if(LoggedInAs=="Rider"){
    res.sendFile(path.join(__dirname+'/srequest.html'));
  }
  else{
    res.send("Driver fhi")
  }
  

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})