const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname,'./static')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/login.html'));

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