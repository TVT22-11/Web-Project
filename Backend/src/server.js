const cors = require('cors');
const express = require('express');

const user = require('./routes/user');
const auth = require('./routes/authorization');
const app = express();
const preferences = require('./routes/preferences');
const review = require('./routes/review');
const group = require('./routes/group');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.use('/auth', auth);
app.use('/review', review);
app.use('/preferences',  preferences);
app.use('/account',  user);
app.use('/group', group);

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Server is running successfully!' });
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});





module.exports = app;
