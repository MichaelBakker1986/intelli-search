import bodyParser  from 'body-parser'
import express     from 'express'
import cors        from 'cors'
import fuzzySearch from './fuzzy-search-impl.js'

const port = process.env.PORT || 3010,
      app  = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/q/:q', (req, res) => {
	res
	.status(200)
	.json(fuzzySearch(req?.params?.q || '')
	.map(({ obj, score }) => ({ slug: obj.slug, target: obj.content.target, score })))
})

app.listen(port, () => {
	console.log('Intelli-search server loaded v3 ', port)
	console.log(`Intelli-search server loaded http://localhost:${ port }/q/blogs`)
})