'use strict'

const Bot = require('./Bot')

module.exports = class Dispatcher {
    constructor() {
        this._pile = []
    }

    stack(command, handler) {
        this._pile = [
            ...this._pile,
            {
                command: command,
                handler: handler
            }
        ]

        return this
    }

    dispatch(message) {
        let bot = new Bot(message)

        for (let e of this._pile) {
            if (bot.argv[0] === e.command) {
                e.handler(bot)
                break
            }
        }
    }
}