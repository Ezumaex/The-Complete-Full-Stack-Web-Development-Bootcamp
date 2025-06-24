import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const secretPassword = "ILoveProgramming";
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body['password'];
  if (password === secretPassword) {
    userIsAuthorised = true;
  }
  next();
}

app.use(passwordCheck);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/check', (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(path.join(__dirname, 'public/secret.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
