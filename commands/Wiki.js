'use strict'

const API = require('../libs/API')

module.exports = class Wiki {
    static get URL() { return 'https://fr.wikipedia.org/w/api.php' }

    static search(bot) {
        bot.argv.shift()

        console.log('Wiki requested.')
        
        API.query({
            uri: Wiki.URL,
            params: {
                action: 'opensearch',
                search: API.parseString(bot.argv.join()),
                limit: 3,
                namespace: 0,
                format: 'json'
            }
        }).then(res => {
            for (let i = 0; i < res[1].length; ++i) {
                if (res[2][i].length) {
                    bot.message.channel.send(`**${res[1][i]}**\n${res[2][i]}`, {
                        tts: true
                    })
                }
            }
        })
    }
}