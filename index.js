try {
    const { Client } = require('discord.js-selfbot-v13');
    const config = require('./config.json');
    // change configuration in config.json file
    const channelCategories = new Set(config.channelCategories);
    const botID = config.botID;

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
    });
    client.on('channelCreate', async (channel) => {
        if (channelCategories.has(channel.parentId) && channel.type == 'GUILD_TEXT') {
            for (let i = 0; i < 3; i++) {
                await channel.sendSlash(botID, 'claim');
            }
        }
    });

    client.login(config.token);
} catch (e) {
    console.log(e);
}