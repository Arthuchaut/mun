'use strict'

module.exports = class Bot {
    constructor(message) {
        this.message = message
        this.argv = this.message.content.split(' ')
    }

    reply(str) {
        this.message
            .channel
            .send(str)
    }

    error(str) {
        this.message
            .channel
            .send(`**error:** ${str}`)
    }
}