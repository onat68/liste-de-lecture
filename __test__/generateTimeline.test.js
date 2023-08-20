const generateTimeline = require('../server/generateTimeline')


describe('Timeline', () => {
    it('should return a different array', () => {
        expect(generateTimeline([0,1])).not.toBe([0,1])
    })
    it('should have the same length', () => {
        expect(generateTimeline([0,1]).length).toEqual([0,1].length)
    })
})