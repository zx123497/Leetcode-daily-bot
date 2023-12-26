
const schedule = require('node-schedule');
const process = require('process');
const client = require('./discordbot');
const { authorize, addQuestion } = require('./googleSheet');
require('dotenv').config();



// ********** main routine **********

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
