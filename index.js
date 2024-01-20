const { Client } = require('discord.js-selfbot-v13');
// add categories here.
const channelCategories = new Set(["1160312872312782958", "1198295808475410433"]);
const botID = '1158149937150836746';

const client = new Client({
    checkUpdate: false,
});
client.on('ready', async () => {
    console.log(`ready with ${client.user.tag}`)
})

client.on('messageCreate', async (message) => {
    if (channelCategories.has(message.channel.parentId) && message.author.id == botID) {
        if (message.components && message.components[0]?.components) {
            // console.log(message)
            const buttons = message.components[0].components;
            const claimButton = buttons.find(b => b.customId == 'claim');
            console.log(claimButton);
            // await claimButton.click(message);
            await message.clickButton('claim');
        }
    }


    if (message.author.id !== client.user.id) return;
    if (message.content === 'ping') {
        const newmessage = await message.channel.messages.fetch('1198314996946456677');
        console.log(newmessage);
    }
    if (message.content === 'help') {
        await message.channel.sendSlash(botID, 'help');
    }
});
client.on('channelCreate', async (channel) => {
    if (channelCategories.has(channel.parentId) && channel.type == 'GUILD_TEXT') {
        for (let i = 0; i < 3; i++) {
            await channel.sendSlash(botID, 'claim');
        }
    }
});

client.login("MTE3NDgwMTUyMzA3MTUyMDg1MA.GIS2eo.yMuFU90tHle_p-ELaCWtWJxWoqjp1gMALOxzCQ");
