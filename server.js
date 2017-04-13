const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const app = express();
var CONFIG = require('./public/config.json');
var db;

var userName = CONFIG.uname;
var passWord = CONFIG.pword;
var dbName = CONFIG.dbname;

var URL='mongodb://'+userName+':'+passWord+'@ds161190.mlab.com:61190/'+dbName;
console.log(URL);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

MongoClient.connect(URL, (err, database) => {
  if (err) 
    return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})


// app.get('/', (req, res) => {
//   console.log("directory " + __dirname);
//   //res.sendFile(__dirname+'/index.html')
// })

app.post('/quote/add', (req, res) => {
  console.log(req.body);
  res.end();
})

app.post('/product/add', (req, res) => {
    db.collection('products').save(req.body, (err, result) => {
    if (err)
     return console.log(err);
    console.log('saved to database');
    res.end();
  })
})