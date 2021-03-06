'use strict'

const Discord    = require('discord.js')
const client     = new Discord.Client()
const env        = require('./env.json')
const Dispatcher = require('./libs/Dispatcher')
const dispatcher = new Dispatcher()

const Wiki       = require('./commands/Wiki')
const Youtube    = require('./commands/Youtube')
const Help       = require('./commands/Help')

dispatcher.stack('!wiki', Wiki.search)
dispatcher.stack('!play', Youtube.play)
dispatcher.stack('!leave', Youtube.leave)
dispatcher.stack('!help', Help.show)

client.on('message', message => {
    dispatcher.dispatch(message)
})

client.on('ready', () => {
    console.log(`Bot connected has ${client.user.tag}`)

    client.user.setUsername('Hal-9000')
        .then(user => console.log('Username setted !'))
        .catch(console.error)   

    client.user.setAvatar('./img/hal9000.png')
        .then(user => console.log('Avatar setted !'))
        .catch(console.error)

    client.user.setActivity('I play Pokemon Go every day.')
        .then(user => console.log('Activity changed !'))
        .catch(console.error)
})

client.login(env.token)