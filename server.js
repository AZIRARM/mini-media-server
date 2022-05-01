const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./routes');
const PORT = process.env.SECRETS_PORT ? process.env.SECRETS_PORT : 9000;

const SECRETS_API_TOKEN = process.env.SECRETS_API_TOKEN ? process.env.SECRETS_API_TOKEN : require('crypto').randomBytes(48, function(err, buffer) {
    let token = buffer.toString('hex');
    console.log("======> Your secret token is : "+token );
    process.env['SECRETS_API_TOKEN'] = token;
    return token;
    });


app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
console.log("Mini Media Server is ready and listening at " + PORT)
})
