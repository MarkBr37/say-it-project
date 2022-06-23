const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');

mongoose.connect('mongodb+srv://mongo-say-It:wQMG2FsznEfoLdU7@cluster0.eupfmgv.mongodb.net/say-it?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB error: ' + err))

app.use(cors());
app.use(express.json());

app.use('/users', users)
app.use('/auth', auth)
app.use('/posts', posts)


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0')