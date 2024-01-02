require('dotenv').config();
const schedule = require('node-schedule');
const { Client, GatewayIntentBits } = require('discord.js');
const { getDailyCodingChallenge } = require('./dailyChallenge');
const { authorize, getDoneList } = require('./googleSheet');
const process = require('process');
// total members in the server
const TOTALMEMBERS = 5;


// bot intents
const client = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
] });

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // create hello slash command
    const helloCommand = {
        name: 'hello',
        description: 'Replies with Hello!',
    };

    // create daily challenge slash command
    const dailyChallengeCommand = {
        name: 'dailychallenge',
        description: 'Replies with the daily coding challenge!',
    };

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const guild2 = client.guilds.cache.get(process.env.GUILD_ID2);
    await guild.commands.create(helloCommand);
    await guild.commands.create(dailyChallengeCommand);
    await guild2.commands.create(helloCommand);
    await guild2.commands.create(dailyChallengeCommand);
    // undone daily challenge notification at 15:30
    let undoneJob = schedule.scheduleJob('0 40 15 * * *', async () =>{
        const doneList = await authorize().then(getDoneList).catch(console.error);
        while(doneList.length < TOTALMEMBERS){
            doneList.push('');
        }
        idList = process.env.MEMBER_IDS.split(', ');
        let undoneNotification = doneList.map((value, index) => {
            if(value === '' && index !== 3){
                return `<@${idList[index]}>`;
            }
        }).join(' ');
        undoneNotification += ' Please finish your daily challenge.';
        const question = await getDailyCodingChallenge();
        undoneNotification += `\nhttps://leetcode.com${question.questionLink}`;
        // send the notification to the discord channel
        client.channels.cache.get(process.env.NOTIFICATION_CHANNEL_ID).send(undoneNotification);
    })
    let newChallengeJob = schedule.scheduleJob('1 0 16 * * *', async () =>{
        // get the daily coding challenge and send it to the discord channel
        const question = await getDailyCodingChallenge();
        client.channels.cache.get(process.env.NOTIFICATION_CHANNEL_ID).send(`Today\'s Leetcode Daily Challenge: ${question.questionTitle}\nhttps://leetcode.com${question.questionLink}`);
    });
    
});

// slash commands handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply(`Hello ${interaction.user.username}`);
    }

    if (interaction.commandName === 'dailychallenge') {
        const question = await getDailyCodingChallenge();
        await interaction.reply(`Today\'s Leetcode Daily Challenge: ${question.questionTitle}\nhttps://leetcode.com${question.questionLink}`);
    }
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
        console.log("to here")
        msg.reply(`Today\'s Leetcode Daily Challenge: ${question.questionTitle}\nhttps://leetcode.com${question.questionLink}`);
    }
});


module.exports = client;



