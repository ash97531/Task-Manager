// require('./db/connect');

const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.get('/hello', (req, res)=>{
    res.send('task manager app');
})
app.get('/login', (req, res)=>{
    console.log("in");
    res.send('task manager app login');
})

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);


/*  // FOR LOCAL HOST FIXED PORT VALUE i.e 3000
const port = 3000;
*/

// FOR DEPLOYMENT WITH MORE SECURITY
const port = process.env.PORT || 3000;

// COMMAND IS - 'PORT=<PORT VALUE> node app.js'

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}....`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

/*  // BEFORE CONNECTING TO DATABASE
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}....`);
})*/