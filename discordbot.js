require('dotenv').config();
const schedule = require('node-schedule');
const { Client, GatewayIntentBits } = require('discord.js');
const { getDailyCodingChallenge } = require('./dailyChallenge');

// bot intents
const client = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let job = schedule.scheduleJob('1 0 16 * * *', async () =>{

        // get the daily coding challenge and send it to the discord channel
        const question = await getDailyCodingChallenge();
        client.channels.cache.get(process.env.NOTIFICATION_CHANNEL_ID).send(`Today\'s Leetcode Daily Challenge: ${question.questionTitle}\nhttps://leetcode.com${question.questionLink}`);
    });
    
});


// bot commands
client.on('messageCreate', async (msg) => {

    // Hello command
    if (msg.content === 'Hello') {
        msg.reply(`Hello ${msg.author.username}`);
    }
    // Daily Challenge command
    if (msg.content === 'Daily Challenge') {
        const question = await getDailyCodingChallenge();
        msg.reply(`Today\'s Leetcode Daily Challenge: ${question.questionTitle}\nhttps://leetcode.com${question.questionLink}`);
    }
});


module.exports = client;



