'use strict'

const fetch = require('node-fetch')

module.exports = class API {
    static parseParams(params) {
        let query = '?'
        let keys = Object.keys(params)

        for (let i = 0; i < keys.length; ++i) {
            query += keys[i] + '=' + params[keys[i]] + ((i < keys.length - 1) ? '&' : '')
        }

        return query
    }

    static parseString(str) {
        if (typeof str !== 'string') {
            throw '1st argument must be a type of string. ' + typeof str + ' given.'
        }

        return encodeURIComponent(str.trim())
    }

    static query(resources) {
        return fetch(resources.uri + this.parseParams(resources.params))
            .then(res => res.json())
            .catch(console.error)
    }
}