try {
    const { Client } = require('discord.js-selfbot-v13');
    const config = require('./config.json');
    // add categories here.
    const channelCategories = new Set(config.channelCategories);
    const botIDs = config.botIDs;

    for (let i = 0; i < config.tokens.length; i++) {
        const client = new Client({
            checkUpdate: false,
        });

        client.on('ready', async () => {
            console.log(`ready with ${client.user.tag}`)
        })

        client.on('messageCreate', async (message) => {
            if (channelCategories.has(message.channel.parentId) && botIDs.includes(message.author.id)) {
                if (message.components && message.components[0]?.components) {
                    // console.log(message)
                    const buttons = message.components[0].components;
                    const claimButton = buttons.find(b => b.customId == 'claim');
                    console.log(claimButton);
                    // await claimButton.click(message);
                    if(claimButton) {
                    await message.clickButton('claim');
                    console.log("Clicked on button with customID: "+claimButton.customId)
                    }
                }
            }
            if (message.author.id !== client.user.id) return;
        });
        client.on('channelCreate', async (channel) => {
            if (channelCategories.has(channel.parentId) && channel.type == 'GUILD_TEXT') {
                for (let i = 0; i < 3; i++) {
                    try {
                        for (let j = 0; j < botIDs.length; j++) {
                            
                            const isMember = channel.guild?.members.cache.has(botIDs[j]);
                            if(isMember) {
                            await channel.sendSlash(botIDs[j], 'claim');
                            console.log("Slash command sent in "+ channel.name);
                            }
                        }
                    } catch (e) {
                        console.log("Warnings\n" + e)
                    }
                }
            }
        });
        client.login(config.tokens[i]);
    }
} catch (e) {
    console.log(e);
}
