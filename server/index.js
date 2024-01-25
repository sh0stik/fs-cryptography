const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000, () => console.log(`running on port 4000`))

const { signup, login} = require('./userController');

app.post(`/signup`, signup);
app.post(`/login`, login);