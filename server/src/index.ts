import express from 'express';
import mongoose from 'mongoose';
import routes from './routes'
const bodyParser = require('body-parser')

const app= express()
const port=3000



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/',routes)

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});


//connecting with database
const dbUrl = 'mongodb://127.0.0.1:27017/addproduct';
const dbOptions: mongoose.ConnectOptions = Object.assign({ useNewUrlParser: true });
mongoose.set('strictQuery', true);

const connectDb = ():Promise<typeof mongoose> => {
    return mongoose.connect(dbUrl, dbOptions).then((mongoDB: typeof mongoose) => {
        console.info(`Connected to database.`);
        return mongoDB;
    }).catch((err: any) => {
        console.error(`Unable to connect to db.`);
        throw err;
    });
}

connectDb();