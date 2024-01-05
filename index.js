const schedule = require('node-schedule');
const process = require('process');
const client = require('./discordbot');
const { authorize, addQuestion } = require('./googleSheet');
const express = require('express');
const indexRouter = require('./Routers/indexRouter');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: 'http://localhost:3000' }));
// api routes
app.use('/', indexRouter);

// ********** express server **********
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// ********** bot routine **********

// update the sheet everyday at 4:01 pm
let job = schedule.scheduleJob('1 0 16 * * *', async function () {
  authorize().then(addQuestion).catch(console.error);
});


// discord bot login
client.login(process.env.DISCORD_TOKEN);

// ************************************
// for testing
// (async () => {
//   authorize().then(addQuestion).catch(console.error);
// })();
