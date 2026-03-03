const express = require ('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use('/', express.static('static_files'));
app.set('view engine', 'ejs');

const logger = (req, res, next) => {
  let url = req.url;
  console.log("Logger: ", req.body);

  let time = new Date();
  console.log(`Received request for ${url} at ${time}`);

  next();
  // return res.send("Not authenticated")
}

app.get('/user', (req, res) => {
  let userData = req.query;
  console.log('userData: ', userData);

  let firstname = userData.firstname;
  let lastname = userData.lastname;

  res.send(`Firstname: ${firstname} and Lastname: ${lastname}`);
});

app.post('/user', logger, (req, res) => {
  let userData = req.body;
  console.log("UserData Post Request", userData);

  let firstname = userData.firstname;
  let lastname = userData.lastname;
  // res.send send back text
  // res.send(`POST >> Firstname: ${firstname} and Lastname: ${lastname}`);
  // res.json send back json object
  res.json(userData);
});

app.post('/userForm', (req, res) => {
  console.log("Form Data: ", req.body);

  res.send(`${req.body.firstname} and ${req.body.lastname} and ${req.body.email} and ${req.body.sex}`);
});

app.listen(port, () => {
  console.log("Server is up", port);
});