"use strict";
console.log("starting server...");
const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
let app = Express();
let route = Express.Router();
AWS.config.loadFromPath('./config.json');
let s3 = new AWS.S3();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', route);
app.listen(3000, () => {
    console.log("Server ready at:", 3000);
});
route.get('/', (req, res) => {
    res.send('Hello!');
});
route.put('/bucket', (req, res) => {
    s3.createBucket({ Bucket: req.body.bucketName }).promise().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
route.get('/bucket/all', (req, res) => {
    s3.listBuckets().promise().then((data) => {
        res.send(data.Buckets);
    }).catch((error) => {
        res.send(error);
    });
});
route.delete('/bucket/:name', (req, res) => {
    s3.deleteBucket({ Bucket: req.params.name }).promise().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
