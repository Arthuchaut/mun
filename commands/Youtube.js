'use strict'

const API  = require('../libs/API')
const ytdl = require('ytdl-core')
const env  = require('../env.json')

module.exports = class Youtube {
    static get YT_URI() { return 'https://www.youtube.com/watch?v=' }
    static get API_URL() { return 'https://www.googleapis.com/youtube/v3/search' }

    static async play(bot) {
        bot.argv.shift()

        let validate = await ytdl.validateURL(bot.argv[0])

        if (validate) {
            Youtube.stream(bot.argv[0], bot)
        } else {
            Youtube.search(bot.argv)
                .then(res => {
                    let items = res.items.filter(item => item.id.videoId)
                    let uri = Youtube.YT_URI + items[0].id.videoId

                    Youtube.stream(uri, bot)
                })
        }
    }

    static async stream(uri, bot) {
        let validate = await ytdl.validateURL(uri)

        if (!validate)
            return bot.error('This url is not valid.')

        if (!bot.message.member.voiceChannel)
            return bot.error('You must be to the voice channel.')
        
        if (bot.message.guild.me.voiceChannel)
            return bot.error('I am already in the voice channel.')

        let info = await ytdl.getInfo(uri)

        let connection = await bot.message.member.voiceChannel.join()

        let dispatcher = await connection.playStream(ytdl(uri, {
            filter: 'audioonly'
        }))

        console.log('Streaming runing...')

        bot.reply(`**Now playing ** ${info.title} **from** ${info.author.name} *(${Youtube.formatTime(info.player_response.videoDetails.lengthSeconds)})*`)

        dispatcher.on('end', () => {
            console.log('Streaming ended.')
            bot.message.member.voiceChannel.leave()
        })

        dispatcher.on('error', () => {
            console.error('Error on reading the stream.')
            bot.error('Oups, an error occured when reading the stream. :(')
        })
    }

    static leave(bot) {
        bot.message.member.voiceChannel.leave()
    }

    static search(argv) {
        argv.shift()

        console.log('Youtube search API requested.')
        
        return API.query({
            uri: Youtube.API_URL,
            params: {
                part: 'id',
                maxResults: 5,
                q: API.parseString(argv.join()),
                key: env.api.youtube.key
            }
        })
    }

    static formatTime(sec) {
        sec = Number(sec)

        let mm = Math.floor(sec % 3600 / 60)
        let ss = Math.floor(sec % 3600 % 60)

        mm = mm < 10 ? '0' + mm : mm
        ss = ss < 10 ? '0' + ss : ss

        return mm + ':' + ss
    }
}