require('dotenv').config();
const cors = require('cors');
const express = require('express');
const user = require('./routes/user');
const auth = require('./routes/authorization');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/account', user);
app.use('/auth', auth);

app.get('/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

const port = process.env.PG_PORT || 3001;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});


module.exports = app;