'use strict'

module.exports = class Help {
    static show(bot) {
        bot.argv.shift()

        let help = '**Commands                Options                Definition**\n' +
                   '!wiki                           <query>               Search a definition on wikipedia\n' +
                   '!play                          <search|url>        Play a video (in audio format) from Youtube\n' +
                   '!leave                         none                     Force the bot to leave the voice channel'

        bot.reply(help)
    }
}