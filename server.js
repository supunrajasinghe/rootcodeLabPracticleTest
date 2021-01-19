require('custom-env').env();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const postsRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('database connection successful')
    })
    .catch(err => console.log('Database connection error: ' + err));



const app = express();

app.use(cors())

const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

app.use('/api/post', postsRoutes);
app.use('/api/comment', commentRoutes);

app.listen(port, () => {
    console.log('server running on port ' + port);
});
