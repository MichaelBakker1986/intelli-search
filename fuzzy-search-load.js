import fuzzysort  from 'fuzzysort'
import fs         from 'fs/promises'
import path       from 'path'
import glob       from 'glob-promise'
import env        from 'dotenv'
import grayMatter from 'gray-matter'

/**
 * Writes the fuzzysort.json file
 * Is build before build to cloud
 * Is not touched runtime
 */
env.config({ path: '.env.local' })
let relativePath = path.relative(process.cwd(), process.env.CONTENT_PATH)
const files = await glob('**/*.md', { cwd: relativePath })

const targets = await Promise.all(files.map(async file => {
	const filePath = path.join(relativePath, file)
	const name = path.basename(filePath, '.md')
	const fileMd = await fs.readFile(filePath, 'utf8')
	const matter = grayMatter(fileMd)
	return {
		slug   : path.relative(process.env.CONTENT_PATH, filePath),
		content: fuzzysort.prepare(matter.content)
	}
}))

await fs.writeFile('fuzzysort.json',
	JSON.stringify(targets),
	{
		key      : 'content',
		limit    : 100,
		threshold: -10000
	})
