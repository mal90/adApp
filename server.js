const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function() {
  console.log('listening on 3000')
})

// app.get('/', (req, res) => {
//   console.log("directory " + __dirname);
//   //res.sendFile(__dirname+'/index.html')
// })

app.post('/quotes', (req, res) => {
  console.log(req.body)
  res.end();
})