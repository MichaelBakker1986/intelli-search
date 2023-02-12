import fuzzysort         from 'fuzzysort'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const targets = require('./fuzzysort.json')

export default function fuzzySearch(query) {
	return fuzzysort.go(query, targets, {
		key      : 'content',
		limit    : 100,
		threshold: -10000,
		all      : false
	})
}