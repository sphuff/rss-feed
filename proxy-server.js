const express = require('express')
const request = require('request')
const cors = require('cors')


const server = express()

server.use(express.json())
server.use(express.urlencoded())
server.use(cors())

server.listen(9001, function() {
    console.log('server started')
})

server.get('/api/:url', (req, res) => {
    const url = req.params.url
    if (!url) {
        res.send({ error: 'Must send a url' })
        return
    }
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.status(400).send({ error: 'Bad request' })
        }
    })
})
