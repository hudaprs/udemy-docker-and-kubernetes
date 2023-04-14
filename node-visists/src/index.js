const express = require('express')
const { createClient } = require('redis')

const app = express()
const client = createClient({
	host: 'redis-server',
	port: 6379
})

const start = async () => {
	client.set('visits', 0)

	app.get('/', async (req, res) => {
		process.exit(0)

		client.get('visits', (err, visits) => {
			res.send(`Number of visits is ${visits}`)
			client.set('visits', parseInt(visits) + 1)
		})
	})

	app.listen(8081, () => console.log(`Listening at port 8081`))
}

start()
