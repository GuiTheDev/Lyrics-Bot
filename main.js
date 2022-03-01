//Importing Modules/Libraries

const { channel } = require('diagnostics_channel');

const Discord = { Client, Intents, DiscordAPIError, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '-';;
const sl = require('songlyrics').default
require('dotenv').config({ path: '.env' });


const token = process.env.TOKEN

//checks if bot is ready
client.on("ready", () => {
    console.log(`Bot is logged in at ${client.user.tag}`)    
})

//checks if a message was sent
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return console.log('first check'); //checks if the message has the prefix or was written by a bot
    const args = message.content.slice(prefix.lenght).trim().split(' '); // get the song name / arguments
    
    const command = args[0].toLowerCase() // gets the command itslef(lyrics)
    const themusic = args.slice(1).join(' ') // gets the;
    console.log(themusic)
    console.log(command)
    console.log(args)

//Uses the findthelyrics module to search the lyrics by scraping genius and MusixMatch as a fallback
    if (command === '-lyrics') {
        
        sl(themusic)
            .then((lyrics => {
                  
                console.log(lyrics.lyrics)
                for(let i = 0; i < lyrics.lyrics.length; i += 2000) {
                    const toSend = lyrics.lyrics.substring(i, Math.min(lyrics.lyrics.length, i + 2000));
                          const lyricsEmbed = new MessageEmbed()
                            .setColor('#ffff00')
                            .setTitle(`Lyrics`)
                            .setDescription(toSend)
                          message.channel.send({ embeds: [lyricsEmbed] })
                        
                }


               
            }))
            .catch(console.warn)


        
    } 
})

client.login(token) //Logs in to the bot with the token