import app from './server.js'
import mongodb from 'mongodb';
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGODB_USERNAME'];
const mongo_password = process.env['MONGODB_PASSWORD'];
//console.log(mongo_password)
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.mexip2i.mongodb.net/ `;


const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch((err) => {
    console.error(err.stack);
    process.exit(1);
})
    .then(async (client) => {
        console.log("TRY HERE");
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    });
