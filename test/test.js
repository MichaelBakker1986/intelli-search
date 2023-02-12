import { should, expect } from 'chai'
import fuzzySearch        from '../fuzzy-search-impl.js'

describe('Fuzzy-search test', function() {

	it('Should find matches', function(done) {
		const result = fuzzySearch('user-experience')
		should().exist(result)
		expect(result).to.be.an('array')
		done()
	})
})
